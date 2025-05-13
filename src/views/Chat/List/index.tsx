import React, { useState } from "react";
import "./style.css";
import { GetChatRoomResponseDto } from "src/apis/dto/response/chat";
import { ResponseDto } from "src/apis/dto/response";
import { CHAT_ABSOLUTE_PATH } from "src/constants";
import { useSignInUserStore } from "src/stores";
import { useNavigate } from "react-router";

interface Props {
  onSelectChat: (chatTitle: string, chatSequence: number) => void;
}

// component: chat list component //
export default function ChatList({ onSelectChat }: Props) {
    
  // state: user Id 상태 //
  const { userId } = useSignInUserStore();
  
  // state: navigator //
  const navigator = useNavigate();

  // state: 채팅 상태 //
  const [chatSequence, setChatSequence] = useState<number>(Number);
  const [requesterId , setRequesterId] = useState<string>('');
  const [applicantId , setApplicantId] = useState<string>('');
  const [chatAvailable, setChatAvailable] = useState<boolean>(false);
  const [needHelperSequence, setNeedHelperSequence] = useState<number>(Number);
  
  // function: get chat room reqeust 처리 함수 //
  const getChatRoomResponse = (responseBody: GetChatRoomResponseDto | ResponseDto | null) => {
      if (!responseBody || responseBody.code !== "SU") {
          alert("채팅을 불러오는데 실패했습니다.");
          navigator(CHAT_ABSOLUTE_PATH);
          return;
      }
      const { chatSequence, requesterId, applicantId, chatAvailable  } = responseBody as GetChatRoomResponseDto;

      setChatSequence(chatSequence);
      setRequesterId(requesterId);
      setApplicantId(applicantId);
      setChatAvailable(chatAvailable)
  };


  // render: chat list component rendering //
  return (
    <div className="chat-list-wrapper">
      <div className="chat-list-header">채팅</div>
      <div className="chat-list-body">
        <div className="chat-item" onClick={() => onSelectChat("nickname", 1)}>
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
