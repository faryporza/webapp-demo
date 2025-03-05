import React, { useState, useRef, useEffect } from 'react';
import { useChat, Message } from '../../context/ChatContext';

const ChatWindow: React.FC = () => {
  const { messages, isChatOpen, sendMessage, closeChat, markAllAsRead } = useChat();
  const [messageInput, setMessageInput] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen) {
      inputRef.current?.focus();
      markAllAsRead();
    }
  }, [isChatOpen, markAllAsRead]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      sendMessage(messageInput);
      setMessageInput('');
    }
  };

  if (!isChatOpen) return null;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl flex flex-col z-50 max-h-[500px]">
      {/* Chat header */}
      <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Customer Support</h3>
          <p className="text-xs text-indigo-200">We typically reply in a few minutes</p>
        </div>
        <button 
          onClick={closeChat}
          className="text-white p-1 hover:bg-indigo-500 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style={{ maxHeight: '350px' }}>
        {messages.map((message: Message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className={`text-xs ${message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'} block mt-1`}>
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 flex">
        <input
          type="text"
          ref={inputRef}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300 rounded-l-md px-4 py-2 text-sm"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 rounded-r-md hover:bg-indigo-700 transition flex items-center"
        >
          <span className="sr-only">Send</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
