"use client"

import { getChatsById } from '@/actions/chats';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';

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
  const pathname = usePathname()
  const _id = pathname.substring(1)
  
  const [messages,setMessages] = useState([]);
  const [newMessage,setNewMessage] = useState([]);

  useEffect(()=>{

    const getMessages = async(id) => {
      const messages = await getChatsById(id);
      setMessages(messages);
    }
    getMessages(_id)
  },[]);

  

  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      "content" : newMessage,
      "document_id" : _id,
      "createdBy" : "USER"
    }

    const BotResponse = await axios.post('/api/chat' , data);

    console.log(BotResponse.data);

    setMessages(...messages, BotResponse.data);
    
    
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
            <Input
              value={newMessage} 
              onChange={(e) => setNewMessage(e.target.value)} 
            />
            <Button variant="outline" onClick={handleSubmit}>Send</Button>
        </div>
    </div>
  );
};

export default Chat;