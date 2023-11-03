import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies";
import { AuthDto, AuthResponseType, login, refresh, signup, SignUpDto, user, UserData } from "@/api/auth.api.ts";
import { AxiosResponse, HttpStatusCode } from "axios";
import useAuth from "@/composables/auth/useAuth.ts";
import router from "@/router";

type AuthStateType = {
  accessToken: string | null,
  refreshToken: string | null,
  user: UserData | null,
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStateType => ({
    accessToken: useCookies().cookies.get('accessToken') || null,
    refreshToken: useCookies().cookies.get('refreshToken') || null,
    user: null,
  }),
  getters: {
    isAuth: (state) => {
      return state.accessToken && state.refreshToken;
    }
  },
  actions: {
    async login(authDto: AuthDto) {
      try {
        const response: AxiosResponse<AuthResponseType> = await login(authDto);
        const { setTokensInCookie } = useAuth();

        setTokensInCookie(response.data.accessToken, response.data.refreshToken);
        this.accessToken = response.data.accessToken;
        this.refreshToken = response.data.refreshToken;

        await this.getUser();

        await router.push({ path: '/' });
      } catch (error: unknown) {
        console.error(error);
      }
    },
    async signup(signUpDto: SignUpDto) {
      try {
        const response: AxiosResponse<null> = await signup(signUpDto);

        if (response.status === HttpStatusCode.Ok) {
          await router.push({ path: '/' });
        }
      } catch (error: unknown) {
        console.error(error);
      }
    },
    async refresh() {
      if (this.refreshToken) {
        const { setTokensInCookie } = useAuth();
        try {
          const response: AxiosResponse<AuthResponseType> = await refresh(this.refreshToken);

          setTokensInCookie(response.data.accessToken, response.data.refreshToken);
          this.accessToken = response.data.accessToken;
          this.refreshToken = response.data.refreshToken;

        } catch (error: unknown) {
          await this.logout();

          console.error(error);
        }
      }
    },
    async logout() {
      const { removeTokensFromCookie } = useAuth();

      removeTokensFromCookie();
      this.accessToken = null;
      this.refreshToken = null;

      await router.push({ path: '/auth' });
    },
    async getUser() {
      if (this.isAuth) {
        try {
          const response: AxiosResponse<UserData> = await user();

          if (response.status === HttpStatusCode.Ok) {
            this.user = response.data;
          }
        } catch (error: unknown) {
          console.error(error);
        }
      }
    }
  }
});
