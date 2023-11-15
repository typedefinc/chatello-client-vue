import axiosInstance from "@/api/index.ts";
import { AxiosResponse } from "axios";

export type MessageType = {
  id: string,
  createdAt: string,
  chatId: string,
  userId: number,
  text: string,
  user: {
    name: string,
  }
}

const getList = async (chatAddress: string): Promise<AxiosResponse<MessageType[]>> => {
  return axiosInstance.request({
    url: `/chat/${chatAddress}/messages`,
    method: 'get',
  })
}

export {
  getList,
}
