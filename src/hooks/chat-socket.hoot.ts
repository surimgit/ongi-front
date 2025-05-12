// src/hooks/useChatSocket.ts
import { useEffect, useRef, useState } from "react";
import { Client, IMessage, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface ChatMessage {
  chatSequence: number;
  senderId: string;
  content: string;
  chatDate: string;
  fileUrl?: string | null;
  isHelper: boolean;
}

export default function useChatSocket(chatSequence: number) {
  const clientRef = useRef<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:4000/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe(`/topic/chat/${chatSequence}`, (message: IMessage) => {
        const body = JSON.parse(message.body) as ChatMessage;
        setMessages((prev) => [...prev, body]);
      });
    });

    clientRef.current = client;

    return () => {
      if (clientRef.current && clientRef.current.connected) {
        clientRef.current.deactivate();
      }
    };
  }, [chatSequence]);

  const sendMessage = (message: ChatMessage) => {
    if (!clientRef.current || !clientRef.current.connected) return;
    clientRef.current.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify(message),
    });
  };

  return { messages, sendMessage };
}
