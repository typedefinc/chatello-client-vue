import { AxiosResponse } from "axios";
import axiosInstance from "@/api/index.ts";

export type UserType = {
  id: string,
  name: string,
  email: string,
}

const getList = async (query: string): Promise<AxiosResponse<UserType[]>> => {
  return axiosInstance.request({
    url: `/user`,
    method: 'get',
    params: {
      query,
    },
  });
}

export {
  getList,
}
