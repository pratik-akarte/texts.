import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useChatStore } from "./../store/useChatStore";
import "./sidebar.css";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { Checkbox } from "@chakra-ui/react";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUserLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnline, setShowOnline] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnline
    ? users?.filter((user) => onlineUsers?.includes(user._id))
    : users;

  const handleToggle = () => setShowOnline(!showOnline);

  if (isUserLoading) {
    return <SidebarSkeleton />;
  }

  return (
    // <aside className="h-screen w-20 lg:w-72 flex flex-col  pt-5 bg-zinc-900">
    //   <div className="flex items-center gap-2 mb-7 px-4 md:px-8 text-blue-100 mt-2 shrink-0 static  ">
    //     <Users className="size-5" />
    //     <span className="font-medium hidden lg:block ">Contacts</span>
    //   </div>

    //   <div className="flex-1 overflow-y-auto w-full space-y-2 px-2">
    //     {users.map((user) => (
    //       <button
    //         key={user._id}
    //         onClick={() => setSelectedUser(user)}
    //         className={`sidebar-contact-btn ${
    //           selectedUser?._id === user._id ? "selected" : ""
    //         }`}
    //       >
    //         <div className="relative mx-auto lg:mx-0 my-2 px-2 lg:px-4">
    //           <img
    //             src={
    //               user?.pic ||
    //               "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
    //             }
    //             alt={user.name}
    //             className="size-12 aspect-square  object-cover rounded-lg"
    //           />
    //           <span
    //             className="absolute bottom-0 right-3 size-3 bg-green-500
    //               rounded-full ring-2"
    //           />
    //         </div>

    //         <div className="hidden lg:block min-w-0">
    //           <p className="font-medium truncate text-blue-100">{user.name}</p>
    //           <p className="text-sm text-zinc-400">Online</p>
    //         </div>
    //       </button>
    //     ))}
    //   </div>
    // </aside>
    <aside className="h-full w-22 lg:w-80 flex flex-col bg-gray-300 transition-all duration-200 ">
      {/* Fixed Header */}

      <div className="flex flex-col items-center lg:items-start gap-2 px-4 md:px-6 text-white h-16 lg:h-20 shrink-0 sticky top-0 z-10 bg-teal-900">
        <div className="flex gap-2 mt-5 lg:mt-3">
          <Users className="size-6 lg:size-5" />
          <span className="font-medium hidden lg:flex">Contacts</span>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <Checkbox isChecked={showOnline} onChange={handleToggle} />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-400">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      {/* Scrollable list */}
      <div className="overflow-y-auto w-full  ">
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-600 py-8">No online users.</div>
        )}

        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`sidebar-contact-btn ${
              selectedUser?._id === user._id ? "selected" : ""
            } `}
          >
            <div className="relative mx-auto lg:mx-0 my-2 px-2 lg:px-4">
              <img
                src={
                  user?.pic ||
                  "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                }
                alt={user.name}
                className="size-12 aspect-square object-cover rounded-lg"
              />

              {onlineUsers?.includes(user._id) && (
                <span className="absolute bottom-0 right-2 lg:right-3 size-2 lg:size-2 bg-green-500 rounded-full ring-2" />
              )}
            </div>

            <div className="hidden lg:block min-w-0">
              <p className="font-medium truncate text-gray-700">{user.name}</p>

              {onlineUsers?.includes(user._id) ? (
                <p className="text-sm text-zinc-600">Online</p>
              ) : (
                <p className="text-sm text-zinc-600">Offline</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
