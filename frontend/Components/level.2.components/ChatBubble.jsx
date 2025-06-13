import React from "react";
import { PHOTO_URL } from "../../constants";

const ChatBubble = ({ authUser, msg, selectedUser }) => {
  // Determine if message is from current user
  const isCurrentUser = msg?.senderId === authUser._id;
  const senderName = isCurrentUser ? authUser.name : selectedUser?.name;

  return (
    <div
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`flex max-w-xs md:max-w-md lg:max-w-lg ${
          isCurrentUser ? "flex-row-reverse" : "flex-row"
        } gap-2`}
      >
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            className="size-8 aspect-square rounded-lg object-cover"
            src={
              isCurrentUser
                ? authUser?.pic || PHOTO_URL
                : selectedUser.pic || PHOTO_URL
            }
            alt={`${senderName}'s profile`}
          />
        </div>

        {/* Message Content */}
        <div
          className={`flex flex-col ${
            isCurrentUser ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`rounded-lg px-4 py-2 ${
              isCurrentUser
                ? "bg-teal-700 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {/* Message Text */}

            {msg?.image && (
              <div className="flex flex-col">
                <img
                  src={msg?.image}
                  alt="Attachment"
                  className=" max-w-[150px] max-h-[150px] lg:max-w-[300px] lg:max-h-[300px]  rounded-mb mb-2"
                />
              </div>
            )}
            {msg?.text && <p className="text-sm break-words">{msg?.text}</p>}
          </div>

          {/* Message Metadata */}
          <div className="flex items-center mt-1 space-x-2 text-xs text-gray-500">
            <span>
              {new Date(msg?.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
            <span>{isCurrentUser && "✓✓"}</span> {/* Read receipts */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
