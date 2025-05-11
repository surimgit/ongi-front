import React, { useState } from "react";
import "./style.css";
import ChatList from "./List";
import ChatDetail from "./Detail";

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="chat-page-wrapper">
      <ChatList onSelectChat={setSelectedChat} />
      {selectedChat ? (
        <ChatDetail chatTitle={selectedChat} />
      ) : (
        <div className="chat-detail-placeholder">채팅방을 선택해주세요.</div>
      )}
    </div>
  );
}
