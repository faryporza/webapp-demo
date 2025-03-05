import React, { useState, useRef } from 'react';
import { useUser } from '../../context/UserContext';
import FaceCamera from './FaceCamera';

const FaceAuthButton: React.FC = () => {
  const { isAuthenticated, currentUser, isFaceAuthEnabled, loginWithFace, logout } = useUser();
  const [showCamera, setShowCamera] = useState(false);
  const [authStatus, setAuthStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFaceDetected = async (detections: any[]) => {
    if (authStatus === 'scanning' && detections.length > 0) {
      const success = await loginWithFace(detections);
      
      if (success) {
        setAuthStatus('success');
        
        // Hide camera after successful login
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setShowCamera(false);
          setAuthStatus('idle');
        }, 2000);
      } else {
        setAuthStatus('error');
        
        // Reset status after a timeout
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setAuthStatus('scanning');
        }, 2000);
      }
    }
  };

  const toggleCamera = () => {
    if (isAuthenticated) {
      logout();
      return;
    }
    
    setShowCamera(!showCamera);
    setAuthStatus(showCamera ? 'idle' : 'scanning');
  };

  return (
    <div className="relative ml-3">
      <button
        onClick={toggleCamera}
        className="flex items-center px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium"
        aria-label="Face authentication"
      >
        {isAuthenticated ? (
          <>
            <img 
              src={currentUser?.avatar || 'https://randomuser.me/api/portraits/lego/5.jpg'} 
              alt={currentUser?.name || 'User'}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span>Logout</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span>Login</span>
            {isFaceAuthEnabled && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            )}
          </>
        )}
      </button>

      {showCamera && !isAuthenticated && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg z-50 p-3 w-80">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-900">
              {authStatus === 'scanning' && "Scanning face..."}
              {authStatus === 'success' && "Login successful!"}
              {authStatus === 'error' && "Face not recognized"}
            </h3>
            <button 
              onClick={() => setShowCamera(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className={`${
            authStatus === 'success' ? 'border-green-500' : 
            authStatus === 'error' ? 'border-red-500' : 'border-gray-300'
          } border-2 rounded-lg overflow-hidden`}>
            <FaceCamera 
              active={showCamera} 
              onFaceDetected={handleFaceDetected}
              width={320}
              height={240}
            />
          </div>
          
          <p className="mt-2 text-xs text-gray-500">
            {authStatus === 'scanning' && "Please position your face in the frame"}
            {authStatus === 'success' && "Welcome back!"}
            {authStatus === 'error' && "Please try again or use email login"}
          </p>
        </div>
      )}
    </div>
  );
};

export default FaceAuthButton;
