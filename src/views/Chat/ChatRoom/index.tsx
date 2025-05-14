import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import useChatSocket from 'src/hooks/chat-socket.hook';
import { ACCESS_TOKEN } from 'src/constants';
import { useCookies } from 'react-cookie';
import { getUserAccountRequest, postReportRequest, getChatMessage } from 'src/apis';
import { GetUserAccountResponseDto } from 'src/apis/dto/response/user';
import { ResponseDto } from 'src/apis/dto/response';
import { Message } from 'src/types/interfaces';
import GetChatMessageResponseDto from 'src/apis/dto/response/chat/get-chat-message.reponse.dto';
import Modal from 'src/components/Modal';
import ReportCategory from 'src/types/aliases/report-category.alias';
import PostReportRequestDto from 'src/apis/dto/request/report/post-report.request.dto';
import e from 'express';

// component: ChatRoom 컴포넌트 //
export default function ChatRoom({ chatSequence }: { chatSequence: number }) {
  const [cookies] = useCookies();
  const accessToken = cookies[ACCESS_TOKEN];
  const { messages: socketMessages, sendMessage } = useChatSocket(chatSequence);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [historyMessages, setHistoryMessages] = useState<Message[]>([]);
  const [selectedMessageSequence, setSelectedMessageSequence] = useState<number | null>(null);
  const [isAllowed, setIsAllowed] = useState(false);

  const allMessages = [...historyMessages, ...socketMessages];

  const firstMessageSequence = allMessages[0]?.messageSequence;
  
  const handleSend = () => {
  
    if (input.trim() === "" || !userId) return;
    
    sendMessage({
      chatSequence,
      senderId: userId, 
      content: input,
      chatDate: new Date(),
      fileUrl: "",
      isHelper: false
    });

    setInput("");
  };
  
  // function: get helper post list 함수 // 
  const getUserAccountResponseDto = (responseBody: GetUserAccountResponseDto | ResponseDto | null) => {
    
    const message = !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess) {
      alert(message);
      
      return;
    }

    const { userId } = responseBody as GetUserAccountResponseDto;
    
    setUserId(userId);
  };

  // function: get chat message response //
  const getChatMessageResponseDto = (responseBody: GetChatMessageResponseDto | ResponseDto | null) => {
    if (!responseBody || !Array.isArray(responseBody)) {
      alert('메시지 응답이 올바르지 않습니다.');
      return;
    }
  
    setHistoryMessages(responseBody);
  }

  // function: format date //
  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
  
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  // event handler: onClickAllowHandler //
  const onClickAllowHandler = () => {
    if (isAllowed) return; // 이미 수락했으면 무시

    sendMessage({
      chatSequence,
      senderId: userId, 
      content: `요청을 수락하였습니다.`,
      chatDate: new Date(),
      fileUrl: "",
      isHelper: true
    });

    setIsAllowed(true);
  }

  // effect: 화면 로드 시 호출 함수 //
  useEffect(() => {
    if (!accessToken) return;
    getUserAccountRequest(accessToken).then(getUserAccountResponseDto);
  }, [accessToken]);

  // effect: 기존 메세지 불러오기 //
  useEffect(() => {
    if (!accessToken) return;
    
    getChatMessage(chatSequence, accessToken).then(getChatMessageResponseDto);
  }, [chatSequence, accessToken]);
  
  // effect: 수락 여부 판단 //
  useEffect(() => {
    const approved = allMessages.some(
      (msg) =>
        msg.content.includes("요청을 수락하였습니다.") && msg.isHelper === true
    );
    setIsAllowed(approved);
  }, [allMessages]);

  return (
    <div className="chat-room">
      <div className="messages">
        {allMessages.map((msg, idx) => (
          <>
            <div
            key={msg.messageSequence}
            className={`message ${
              String(msg.senderId) === String(userId) ? 'my-message' : 'other-message'
            }`}
            >
              <strong>{msg.senderId}</strong>: {msg.content}
            
              {/* ✅ 조건부 버튼 렌더링 */}
              {msg.messageSequence === firstMessageSequence && (
                <button
                  className="start-chat-button"
                  onClick={onClickAllowHandler} 
                  disabled={String(msg.senderId) === String(userId) || isAllowed}
                >
                  요청 수락하기
                </button>
              )}
            </div>            
            <div className={`chat-date ${
              String(msg.senderId) === String(userId) ? 'my-message' : 'other-message'
            }`}>{formatDate(msg.chatDate)}</div>      
            </>    
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={isAllowed ? "메시지를 입력하세요" : "요청을 수락해야 채팅이 가능합니다."}
          disabled={!isAllowed}
        />
        <button onClick={handleSend} >전송</button>
      </div>
    </div>
  );
}
