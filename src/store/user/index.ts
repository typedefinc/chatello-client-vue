import { defineStore } from "pinia";
import { getList, UserType } from "@/api/user.api.ts";
import { AxiosResponse, HttpStatusCode } from "axios";

type UserStoreStateType = {
  list: UserType[],
}

const useUserStore = defineStore('user', {
  state: (): UserStoreStateType => ({
    list: []
  }),
  actions: {
    async getList(query: string) {
      const response: AxiosResponse<UserType[]> = await getList(query);

      if (response.status === HttpStatusCode.Ok) {
        this.list = response.data;
      }
    }
  }
})

export default useUserStore;
