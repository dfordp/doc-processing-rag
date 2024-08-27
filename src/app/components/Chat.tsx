"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

enum Role {
  USER = 'USER',
  BOT = 'BOT'
}

interface Message {
  id: number;
  role: Role;
  content: string;
}

const Chat = () => {
  const router = useRouter();
  const { pathname } = router;

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: Role.BOT, content: "Hello! How can I assist you today?" },
    { id: 2, role: Role.USER, content: "I need help with my order." }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        role: Role.USER,
        content: input
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  return (
    <div>
        <div>
          <div>
            {messages.map((message) => (
              <div key={message.id} className={message.role === Role.BOT ? 'bot-message' : 'user-message'}>
                <strong>{message.role}:</strong> {message.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Type your message here..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
    </div>
  );
};

export default Chat;