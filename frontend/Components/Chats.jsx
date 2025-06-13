import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import ChatPlaceHolder from "./ChatPlaceHolder";

import ChatSkeleton from "./skeletons/ChatSkeleton";
import ChatBubble from "./level.2.components/ChatBubble";
import { useAuthStore } from "./../store/useAuthStore";

const Chats = () => {
  const {
    messages,
    getMessages,
    isMessageLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeToMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = null;

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeToMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeToMessages,
  ]);

  useEffect(() => {
    if (messageEndRef?.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessageLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />

        <ChatSkeleton />

        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 h-full overflow-auto p-4 space-y-4">
        {messages?.map((message) => {
          return (
            <ChatBubble
              ref={messageEndRef}
              key={message._id} // Also make key unique per message
              authUser={authUser}
              selectedUser={selectedUser}
              msg={message}
            />
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default Chats;
