import React, { useEffect, useState } from 'react'
import './style.css';
import useChatSocket from 'src/hooks/chat-socket.hoot';
import { useSignInUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from 'src/constants';

export default function ChatRoom({ chatSequence }: { chatSequence: number }) {
  const { messages, sendMessage } = useChatSocket(chatSequence);
  const [input, setInput] = useState("");

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  const handleSend = () => {
    if (input.trim() === "") return;
    sendMessage({
      chatSequence,
      senderId: "userId",
      content: input,
      chatDate: new Date().toISOString(),
      fileUrl: null,
      isHelper: false,
    });
    setInput("");
  };

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if(!accessToken) return;
  }, [])

  return (
    <div className="chat-room">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="message">
            [{msg.senderId}] {msg.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
    
  );
}
