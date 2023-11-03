import axiosInstance from "@/api/index.ts";
import { AxiosResponse } from "axios";
import { UserType } from "@/api/user.api.ts";

export type ChatType = {
  id: string,
  address: string,
  title: string,
  imgUrl?: string,
  lastMessage?: string,
}

export type CreateChatDto = {
  title?: string,
  users: number[],
}

export type ChatInfo = {
  id: number,
  title?: string,
  address: string,
  users: UserType[],
}

const getList = async (): Promise<AxiosResponse<ChatType[]>> => {
  return axiosInstance.request({
    url: '/chat',
    method: 'get',
  })
}

const createChat = async (data: CreateChatDto): Promise<AxiosResponse<null>> => {
  return axiosInstance.request({
    url: '/chat',
    method: 'post',
    data,
  })
}

const getChatInfo = async (chatId: string): Promise<AxiosResponse<ChatInfo>> => {
  return axiosInstance.request({
    url: `/chat/${chatId}/ticket`,
    method: 'get',
  })
}

export {
  getList,
  createChat,
  getChatInfo,
}
