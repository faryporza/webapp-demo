import React, { useState, useEffect } from 'react';
import SimpleFaceAuthButton from './SimpleFaceAuthButton';

interface ServiceFaceAuthProps {
  serviceName?: string;
  serviceId?: string;
  isVisible: boolean;
}

const ServiceFaceAuth: React.FC<ServiceFaceAuthProps> = ({ 
  serviceName = "บริการ", 
  serviceId, 
  isVisible 
}) => {
  const [showBanner, setShowBanner] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'failed'>('idle');
  
  // Show the banner when a service is selected
  useEffect(() => {
    if (isVisible) {
      setShowBanner(true);
      
      // Auto-hide after 10 seconds if no interaction
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  
  const handleVerifyIdentity = () => {
    setVerificationStatus('verifying');
    
    // Simulate verification process
    setTimeout(() => {
      // 80% chance of success for demo purposes
      if (Math.random() < 0.8) {
        setVerificationStatus('success');
      } else {
        setVerificationStatus('failed');
      }
      
      // Reset after 3 seconds
      setTimeout(() => {
        setVerificationStatus('idle');
      }, 3000);
    }, 2000);
  };
  
  if (!showBanner) return null;
  
  return (
    <div className="fixed top-16 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 shadow-md z-50 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">
            {verificationStatus === 'idle' && `ยืนยันตัวตนสำหรับการจอง${serviceName}`}
            {verificationStatus === 'verifying' && 'กำลังสแกนใบหน้า...'}
            {verificationStatus === 'success' && 'ยืนยันตัวตนสำเร็จ!'}
            {verificationStatus === 'failed' && 'ยืนยันตัวตนไม่สำเร็จ โปรดลองอีกครั้ง'}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          {verificationStatus === 'idle' && (
            <button 
              onClick={handleVerifyIdentity}
              className="bg-white text-indigo-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-indigo-50"
            >
              ยืนยันตัวตน
            </button>
          )}
          
          {verificationStatus === 'verifying' && (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>กำลังประมวลผล...</span>
            </div>
          )}
          
          <button 
            onClick={() => setShowBanner(false)}
            className="text-white hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceFaceAuth;
