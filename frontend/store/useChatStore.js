import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");

      console.log(res.data);
      set({ users: res.data });
    } catch (error) {
      console.error("Error in fetching users" + " " + error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (id) => {
    set({ isMessagesLoading: true });
    try {
      // eslint-disable-next-line no-undef
      const res = await axiosInstance.get(`/message/${id}`);
      console.log(res.data);
      set({ messages: res.data });
    } catch (error) {
      console.error("Error in fetching messages" + " " + error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (msgData) => {
    const { selectedUser, messages } = get();

    try {
      const msg = await axiosInstance.post(
        `/message/send/${selectedUser?._id}`,
        msgData
      );
      set({ messages: [...messages, msg?.data] });
    } catch (error) {
      console.error("Error in sending messages" + " " + error);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      //if message sent from selected use or no if not just return
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },
  unsubscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
