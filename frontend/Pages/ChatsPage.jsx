import React, { useEffect, useState } from "react";
import axios from "axios";

function ChatsPage() {
  const [Chats, setChats] = useState([]);
  const fetchChats = async () => {
    const { data } = await axios.get("/api/chats");
    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <>
      {Chats.map((c) => (
        <h1 key={c._id}>{c.chatName}</h1>
      ))}
    </>
  );
}

export default ChatsPage;
