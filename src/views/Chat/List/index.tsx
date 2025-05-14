import React, { useEffect, useState } from "react";
import "./style.css";
import { ACCESS_TOKEN, CHAT_ABSOLUTE_PATH } from "src/constants";
import { useSignInUserStore } from "src/stores";
import { useNavigate } from "react-router";
import { getChatRoomListRequest, getUserNicknameRequest } from "src/apis";
import { useCookies } from "react-cookie";
import Chat from "src/types/interfaces/chat.interface"; 

interface Props {
  onSelectChat: (chatTitle: string, chatSequence: number) => void;
}

type ChatWithNickname = Chat & { otherNickname: string };

export default function ChatList({ onSelectChat }: Props) {
  const { userId } = useSignInUserStore();
  const navigator = useNavigate();
  const [chats, setChats] = useState<ChatWithNickname[]>([]);
  const [cookies] = useCookies();
  const accessToken = cookies[ACCESS_TOKEN];

  useEffect(() => {
    if (!accessToken) return;
  
    getChatRoomListRequest(accessToken).then(async (response) => {
      if (!response || response.code !== "SU" || !("chatList" in response)) {
        alert("채팅방 목록을 불러오는데 실패했습니다.");
        navigator(CHAT_ABSOLUTE_PATH);
        return;
      }
  
      const chatRooms = response.chatList;
  
      const chatWithNicknames = await Promise.all(
        chatRooms.map(async (chat) => {
          const otherUserId = userId === chat.requesterId ? chat.applicantId : chat.requesterId;
      
          const nicknameResponse = await getUserNicknameRequest(otherUserId, accessToken);
          const nickname = nicknameResponse?.nickname || "알 수 없음";
      
          return { ...chat, otherNickname: nickname };
        })
      );
  
      setChats(chatWithNicknames);
    });
  }, [accessToken]);  

  return (
    <div className="chat-list-wrapper">
      <div className="chat-list-header">채팅</div>
      <div className="chat-list-body">
        {chats.map((chat) => (
          <div
            className="chat-item"
            key={chat.chatSequence}
            onClick={() => onSelectChat(chat.otherNickname, chat.chatSequence)}
          >
            <div className="chat-item-avatar" />
            <div className="chat-item-info">
              <div className="chat-item-name">{chat.otherNickname}</div>
              <div className="chat-item-subtitle">온기</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
