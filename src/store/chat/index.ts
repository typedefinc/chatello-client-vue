import { defineStore } from "pinia";
import { ChatInfo, ChatType, createChat, CreateChatDto, getChatInfo, getList } from "@/api/chat.api.ts";
import { AxiosResponse, HttpStatusCode } from "axios";
import router from "@/router";

type ChatStoreStateType = {
  list: ChatType[],
  chatInfo: ChatInfo | null,
}

const useChatStore = defineStore('chat', {
  state: (): ChatStoreStateType => ({
    list: [],
    chatInfo: null,
  }),
  actions: {
    async getList() {
      const response: AxiosResponse<ChatType[]> = await getList();

      if (response.status === HttpStatusCode.Ok) {
        this.list = response.data;
      }
    },
    async create(data: CreateChatDto) {
      const response: AxiosResponse<null> = await createChat(data);

      if (response.status === HttpStatusCode.Created) {
        await this.getList();

        await router.push({ path: '/' });
      }
    },
    async getChatInfo(chatAddress: string) {
      const response: AxiosResponse<ChatInfo> = await getChatInfo(chatAddress)

      if (response.status === HttpStatusCode.Ok) {
        this.chatInfo = response.data;
      }
    }
  }
})

export default useChatStore;
