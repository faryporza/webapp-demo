import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import TechnicianServices from './pages/TechnicianServices';
import Demo from './pages/Demo';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import { ChatProvider } from './context/ChatContext';
import ChatButton from './components/chat/ChatButton';
import ChatWindow from './components/chat/ChatWindow';

// More robust UserProvider check and import
let UserProvider: React.FC<{children: React.ReactNode}> | null = null;
let isFaceApiAvailable = false;

try {
  // This will throw an error if face-api.js is not installed
  // eslint-disable-next-line
  const faceapi = require('face-api.js');
  isFaceApiAvailable = true;
  
  try {
    // Only try to import UserProvider if face-api.js is available
    const UserContext = require('./context/UserContext');
    if (UserContext && UserContext.UserProvider) {
      UserProvider = UserContext.UserProvider;
      console.log('Face authentication is enabled');
    }
  } catch (error) {
    console.error('Failed to load UserContext:', error);
  }
} catch (error) {
  console.log('Face-api.js is not installed. Face authentication is disabled.');
}

// Component that wraps children with UserProvider if available
const ConditionalUserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return UserProvider ? <UserProvider>{children}</UserProvider> : <>{children}</>;
};

function App() {
  return (
    <CartProvider>
      <NotificationProvider>
        <ChatProvider>
          <ConditionalUserProvider>
            <div className="min-h-screen bg-gray-100">
              <Navbar />
              <div className="container mx-auto px-4 py-8">
                <Home />
                <hr className="my-8 border-gray-300" />
                <Services />
                <hr className="my-8 border-gray-300" />
                <TechnicianServices />
                <hr className="my-8 border-gray-300" />
                <Demo />
              </div>
              <ChatButton />
              <ChatWindow />
            </div>
          </ConditionalUserProvider>
        </ChatProvider>
      </NotificationProvider>
    </CartProvider>
  );
}

export default App;
