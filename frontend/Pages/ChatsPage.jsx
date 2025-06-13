import { Button, Flex, Text } from "@chakra-ui/react";

import NavBar from "../Components/NavBar.jsx";
import { useChatStore } from "../store/useChatStore.js";
import Chats from "./../Components/Chats";
import ChatPlaceHolder from "./../Components/ChatPlaceHolder";
import Sidebar from "./../Components/Sidebar";
import Footer from "../Components/Footer.jsx";

function ChatsPage() {
  const { selectedUser } = useChatStore();
  return (
    <div className=" h-screen bg-teal-100">
      <NavBar />
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-2xl w-full max-w-5xl h-[calc(100vh-13rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <ChatPlaceHolder /> : <Chats />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChatsPage;
