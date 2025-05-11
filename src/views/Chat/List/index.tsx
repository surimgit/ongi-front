import React from "react";
import "./style.css";

interface Props {
  onSelectChat: (chatName: string) => void;
}

export default function ChatList({ onSelectChat }: Props) {
  return (
    <div className="chat-list-wrapper">
      <div className="chat-list-header">채팅</div>
      <div className="chat-list-body">
        <div className="chat-item" onClick={() => onSelectChat("nickname")}>
          <div className="chat-item-avatar" />
          <div className="chat-item-info">
            <div className="chat-item-name">nickname</div>
            <div className="chat-item-subtitle">온기</div>
          </div>
        </div>
      </div>
    </div>
  );
}
