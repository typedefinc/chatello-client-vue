import { defineStore } from "pinia";
import { getList, MessageType } from "@/api/message.api.ts";
import { AxiosResponse, HttpStatusCode } from "axios";

type MessageStoreStateType = {
  list: MessageType[],

}

const useMessageStore = defineStore('message', {
  state: (): MessageStoreStateType => {
    return {
      list: [],
    }
  },
  actions: {
    async getMessageList(chatAddress: string) {
      const response: AxiosResponse<MessageType[]> = await getList(chatAddress);

      if (response.status === HttpStatusCode.Ok) {
        this.list = response.data;
      }
    }
  }
})

export default useMessageStore;
