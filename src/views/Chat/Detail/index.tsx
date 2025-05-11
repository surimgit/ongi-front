import { useState } from "react";
import "./style.css";

interface Props {
  chatTitle: string;
}

interface Message {
  id: number;
  sender: "me" | "other";
  content: string;
}

export default function ChatDetail({ chatTitle }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "me",
      content: inputValue,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <div className="chat-detail-wrapper">
      <div className="chat-detail-header">
        <div className="chat-detail-info">
          <div className="chat-detail-title">{chatTitle}</div>
          <div className="chat-detail-subtitle">온기</div>
        </div>
      </div>
      <div className="chat-detail-body">
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${
                message.sender === "me" ? "me" : "other"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-input-area">
          <input
            type="text"
            className="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="메시지를 입력하세요."
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button className="chat-send-button" onClick={sendMessage}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
