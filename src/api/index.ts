import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { useCookies } from "vue3-cookies";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

const { cookies } = useCookies();

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = cookies.get('accessToken') ?? '';

  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
}, (error) => Promise.reject(error));

axiosInstance.interceptors.response.use(request => request, async (error: AxiosError): Promise<AxiosError>  => {
  const originalConfig = error.config as AxiosRequestConfig;
  const { isAuth, accessToken } = storeToRefs(useAuthStore());
  const status: number = error.response?.status ?? 500;
  const refreshUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`;

  if (error.response && status === 401 && isAuth.value && originalConfig.baseURL !== refreshUrl) {
    await useAuthStore().refresh();

    originalConfig.headers = {
      ...originalConfig.headers,
      Authorization: `Bearer ${accessToken.value}`,
    };

    return axios.request(originalConfig);
  }

  return Promise.reject(error);
});

export default axiosInstance;
