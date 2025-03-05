import React from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';

// No longer wrapping with ChatProvider since it's provided at the App level
const ChatSupport: React.FC = () => {
  return (
    <>
      <ChatButton />
      <ChatWindow />
    </>
  );
};

export default ChatSupport;
