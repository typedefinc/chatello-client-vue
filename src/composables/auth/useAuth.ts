import { useCookies } from "vue3-cookies";

export default function useAuth() {
  return {
    setTokensInCookie(accessToken: string, refreshToken: string) {
      const { cookies } = useCookies();

      cookies.set('accessToken', accessToken);
      cookies.set('refreshToken', refreshToken);
    },
    removeTokensFromCookie() {
      const { cookies } = useCookies();

      cookies.remove('accessToken');
      cookies.remove('refreshToken');
    }
  }
}
