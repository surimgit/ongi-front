import React, { useEffect, useState } from 'react'
import "./style.css";
import ChatRoom from '../ChatRoom';
import { response } from 'express';
import { getLatestMessage } from 'src/apis';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from 'src/constants';
import GetLatestMessageResponseDto from 'src/apis/dto/response/chat/get-latest-message.response.dto';


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
          <div className="chat-detail-subtitle"></div>
        </div>
      </div>
      <ChatRoom chatSequence={chatSequence} />
    </div>
  );
}
