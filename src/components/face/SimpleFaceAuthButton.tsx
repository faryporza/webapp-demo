import React, { useState } from 'react';

// Simple version that doesn't rely on UserContext
const SimpleFaceAuthButton: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [hasServiceRequests, setHasServiceRequests] = useState(false);
  
  // Simulate receiving service requests after 8 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHasServiceRequests(true);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleAuth = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
    } else {
      setShowCamera(!showCamera);
    }
  };

  // Mock login function
  const mockLogin = () => {
    setIsAuthenticated(true);
    setShowCamera(false);
  };
  
  return (
    <div className="relative ml-3">
      <button
        onClick={toggleAuth}
        className={`flex items-center px-3 py-1.5 rounded-lg ${
          hasServiceRequests 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
            : 'bg-indigo-600'
        } hover:bg-indigo-700 text-white text-sm font-medium`}
      >
        {isAuthenticated ? (
          <>
            <img 
              src="https://randomuser.me/api/portraits/lego/5.jpg" 
              alt="รูปผู้ใช้"
              className="w-6 h-6 rounded-full mr-2"
            />
            <span>ออกจากระบบ</span>
            {hasServiceRequests && (
              <span className="ml-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span>เข้าสู่ระบบ</span>
            {hasServiceRequests && (
              <span className="flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
          </>
        )}
      </button>

      {showCamera && !isAuthenticated && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg z-50 p-3 w-80">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-900">เข้าสู่ระบบด้วยใบหน้า</h3>
            <button 
              onClick={() => setShowCamera(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
            <div className="p-8 flex flex-col items-center bg-gray-50">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-4 text-center">
                ระบบยืนยันตัวตนด้วยใบหน้าต้องการ face-api.js<br />กำลังใช้โหมดทดลอง
              </p>
              <button 
                onClick={mockLogin} 
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                ทดลองเข้าสู่ระบบ
              </button>
            </div>
          </div>
          
          {hasServiceRequests && (
            <div className="mt-3 p-3 bg-indigo-50 border border-indigo-100 rounded-md">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-indigo-800 font-medium">
                  เข้าสู่ระบบเพื่อดูคำขอบริการของคุณ
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleFaceAuthButton;
