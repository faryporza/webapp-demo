import React, { useState, useRef } from 'react';
import { useUser } from '../../context/UserContext';
import FaceCamera from './FaceCamera';

const FaceRegistration: React.FC = () => {
  const { registerFace, isAuthenticated, currentUser, isFaceAuthEnabled, toggleFaceAuthEnabled } = useUser();
  const [showCamera, setShowCamera] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      return;
    }
    
    setShowCamera(true);
    setRegistrationStatus('scanning');
  };

  const handleFaceDetected = async (detections: any[]) => {
    if (!videoRef.current || registrationStatus !== 'scanning') return;
    
    if (detections.length === 1) {
      try {
        await registerFace(videoRef.current);
        setRegistrationStatus('success');
        
        // Hide camera after a delay
        setTimeout(() => {
          setShowCamera(false);
          setRegistrationStatus('idle');
        }, 3000);
      } catch (error) {
        console.error("Error registering face:", error);
        setRegistrationStatus('error');
      }
    } else if (detections.length > 1) {
      setRegistrationStatus('error');
    }
  };

  const handleNoFaceDetected = () => {
    if (registrationStatus === 'scanning') {
      setRegistrationStatus('scanning');
    }
  };

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Face Authentication</h2>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-700">Use your face to log in without a password</p>
          <p className="text-xs text-gray-500 mt-1">Your face data is stored securely on your device</p>
        </div>
        <label className="inline-flex relative items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer"
            checked={isFaceAuthEnabled}
            onChange={toggleFaceAuthEnabled}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>
      
      {showCamera ? (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-900">
              {registrationStatus === 'scanning' && "Position your face in the frame"}
              {registrationStatus === 'success' && "Face registered successfully!"}
              {registrationStatus === 'error' && "Error registering face"}
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
            registrationStatus === 'success' ? 'border-green-500' : 
            registrationStatus === 'error' ? 'border-red-500' : 'border-gray-300'
          } border-2 rounded-lg overflow-hidden`}>
            <FaceCamera 
              active={showCamera} 
              onFaceDetected={handleFaceDetected}
              onNoFaceDetected={handleNoFaceDetected}
              width={480}
              height={360}
            />
          </div>
          
          <p className="mt-2 text-xs text-gray-500">
            {registrationStatus === 'scanning' && "Make sure your face is well-lit and centered"}
            {registrationStatus === 'success' && "You can now use face authentication to login"}
            {registrationStatus === 'error' && "Please ensure only one face is visible and try again"}
          </p>
        </div>
      ) : (
        <button
          onClick={handleRegisterClick}
          className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          Register Your Face
        </button>
      )}
      
      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
        <p className="text-xs text-yellow-700">
          <strong>Note:</strong> This face detection is a demo feature. In a production environment, 
          additional security measures would be implemented to protect biometric data.
        </p>
      </div>
    </div>
  );
};

export default FaceRegistration;
