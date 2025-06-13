import React from "react";
import { MessageSquare, MessageSquareDot } from "lucide-react";

const ChatPlaceHolder = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gray-200 border-2 border-gray-200 shadow-md">
      <div className="max-w-md text-center ">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-xl bg-gray-300 flex items-center
             justify-center animate-bounce"
            >
              <MessageSquareDot className="w-8 h-8  text-teal-800" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-bold">Welcome to texts.</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default ChatPlaceHolder;
