import { X } from "lucide-react";
// import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  //   const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 px-4 bg-gray-700 sticky top-0 border-b border-red-900 ">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div>
              <img
                src={
                  selectedUser.pic ||
                  "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                }
                alt={selectedUser.name}
                className="size-10 rounded-lg relative aspect-square"
              />
            </div>
          </div>

          {/* User info */}
          <div className="font-semibold text-cyan-50">
            <h3>{selectedUser.name}</h3>
            <p className="text-sm font-light text-zinc-300">
              Online
              {/* {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"} */}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X className="text-blue-50" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
