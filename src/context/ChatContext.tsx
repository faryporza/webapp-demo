import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'service';
  timestamp: Date;
}

interface ChatContextProps {
  messages: Message[];
  isChatOpen: boolean;
  unreadCount: number;
  sendMessage: (text: string) => void;
  toggleChat: () => void;
  closeChat: () => void;
  markAllAsRead: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can we help you today?',
      sender: 'service',
      timestamp: new Date()
    }
  ]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  
  // Automatic responses for demo purposes
  const autoResponses = [
    'Thanks for your message! One of our service representatives will get back to you shortly.',
    'Could you please provide more details about the service you\'re interested in?',
    'We offer a variety of cleaning and maintenance services. Would you like more information about any specific one?',
    'We can schedule a service appointment for you. What date and time would work best for you?',
    'Great! I\'ve noted your preferences. Is there anything else you\'d like to know about our services?'
  ];
  
  // Demo service representative names
  const serviceReps = ['Alex', 'Jamie', 'Taylor', 'Morgan', 'Jordan'];
  
  useEffect(() => {
    // Count unread messages from service when chat is closed
    if (!isChatOpen) {
      const newUnreadCount = messages.filter(m => m.sender === 'service').length;
      setUnreadCount(newUnreadCount);
    } else {
      setUnreadCount(0);
    }
  }, [messages, isChatOpen]);
  
  // Send user message and get automatic response
  const sendMessage = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Simulate typing delay for auto-response
    setTimeout(() => {
      // Random response from a service representative
      const randomRepIndex = Math.floor(Math.random() * serviceReps.length);
      const randomResponseIndex = Math.floor(Math.random() * autoResponses.length);
      
      const serviceMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `${serviceReps[randomRepIndex]}: ${autoResponses[randomResponseIndex]}`,
        sender: 'service',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, serviceMessage]);
    }, 1500);
  };
  
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  
  const closeChat = () => setIsChatOpen(false);
  
  const markAllAsRead = () => setUnreadCount(0);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isChatOpen,
        unreadCount,
        sendMessage,
        toggleChat,
        closeChat,
        markAllAsRead
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
