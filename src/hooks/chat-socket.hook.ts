import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from 'src/constants';
import { Message } from 'src/types/interfaces';

export default function useChatSocket(chatSequence: number) {
  const [cookies] = useCookies();
  const accessToken = cookies[ACCESS_TOKEN];
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  type SendableChatMessage = Omit<Message, 'messageSequence'>;

  useEffect(() => {
    if (!accessToken) return;
    console.log("📡 소켓 연결 시도 중...");
    const socket = io('http://localhost:4001', {
      query: { token: `Bearer ${accessToken}` },
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ 소켓 연결됨:', socket.id);
      socket.emit('join_room', String(chatSequence));
    });

    socket.on('chat_message', (msg: Message) => {
      console.log('📥 메시지 도착:', msg);
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ 소켓 연결 에러:", err.message);
    });
    
    return () => {
      socket.emit('leave_room', String(chatSequence));
      socket.disconnect();
    };
  }, [chatSequence, accessToken]);

  const sendMessage = (msg: SendableChatMessage) => {
    if (!socketRef.current || !socketRef.current.connected) {
      console.warn("❌ 소켓 연결 안됨, 메시지 전송 취소"); return;
    }
  
    console.log("📤 메시지 전송:", msg);
    socketRef.current.emit('chat_message', msg);
  };

  return { messages, sendMessage };
}
