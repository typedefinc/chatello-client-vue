import axiosInstance from "@/api/index.ts";
import { AxiosResponse } from "axios";

export type AuthDto = {
  email: string,
  password: string,
}

export type SignUpDto = {
  email: string,
  name: string,
  password: string,
}

export type AuthResponseType = {
  accessToken: string,
  refreshToken: string,
}

export type UserData = {
  id: number,
  name: string,
  email: string,
}

const login = async (data: AuthDto): Promise<AxiosResponse<AuthResponseType>> => {
  return axiosInstance.request({
    method: 'post',
    url: '/auth/login',
    data,
  })
}

const signup = async (data: SignUpDto): Promise<AxiosResponse<null>> => {
  return axiosInstance.request({
    method: 'post',
    url: '/auth/signup',
    data,
  })
}

const refresh = async (refreshToken: string): Promise<AxiosResponse<AuthResponseType>> => {
  return axiosInstance.request({
    method: 'post',
    url: '/auth/refresh',
    data: {
      refreshToken,
    }
  })
}

const user = async (): Promise<AxiosResponse<UserData>> => {
  return axiosInstance.request({
    method: 'get',
    url: '/auth/user',
  });
}

export {
  login,
  refresh,
  signup,
  user,
}
