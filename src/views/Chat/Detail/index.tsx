import React from 'react'
import "./style.css";
import ChatRoom from '../ChatRoom';


interface Props {
  chatTitle: string;
  chatSequence: number; // chatSequence도 props로 받아야 함
}

export default function ChatDetail({ chatTitle, chatSequence }: Props) {
  return (
    <div className="chat-detail-wrapper">
      <div className="chat-detail-header">
        <div className="chat-detail-info">
          <div className="chat-detail-title">{chatTitle}</div>
          <div className="chat-detail-subtitle">온기</div>
        </div>
      </div>
      <ChatRoom chatSequence={chatSequence} />
    </div>
  );
}
