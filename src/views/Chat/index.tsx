import React, { useState } from "react";
import "./style.css";
import ChatList from "./List";
import ChatDetail from "./Detail";


export default function Chat() {
  const [selectedChat, setSelectedChat] = useState<string>('');
  const [chatSequence, setChatSequence] = useState<number | null>(null);

  const handleSelectChat = (chatTitle: string, chatSequence: number) => {
    setSelectedChat(chatTitle);
    setChatSequence(chatSequence);
  };

  return (
    <div className="chat-page-wrapper">
      <ChatList onSelectChat={handleSelectChat} />
      {selectedChat && chatSequence !== null ? (
        <ChatDetail chatTitle={selectedChat} chatSequence={chatSequence} />
      ) : (
        <div className="chat-detail-placeholder">채팅방을 선택해주세요.</div>
      )}
    </div>
  );
}
