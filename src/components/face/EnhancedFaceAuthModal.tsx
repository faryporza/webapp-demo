import React, { useState, useRef, useEffect } from 'react';

interface EnhancedFaceAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onFail?: () => void;
  serviceName?: string;
}

const EnhancedFaceAuthModal: React.FC<EnhancedFaceAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onFail,
  serviceName
}) => {
  const [scanStatus, setScanStatus] = useState<'ready' | 'scanning' | 'success' | 'failed'>('ready');
  const [scanProgress, setScanProgress] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Clear interval when component unmounts
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isOpen, onClose]);
  
  const startScan = () => {
    setScanStatus('scanning');
    setScanProgress(0);
    
    // Simulate scanning progress
    progressInterval.current = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval.current!);
          
          // 80% chance of success for demo purposes
          if (Math.random() < 0.8) {
            setScanStatus('success');
            if (onSuccess) onSuccess();
            return 100;
          } else {
            setScanStatus('failed');
            if (onFail) onFail();
            return 100;
          }
        }
        return prev + 5;
      });
    }, 150);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full mx-4"
      >
        <div className="bg-indigo-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-white">ยืนยันตัวตนด้วยใบหน้า</h3>
            <button
              onClick={onClose}
              className="text-indigo-100 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          {serviceName && (
            <p className="text-indigo-100 text-sm">บริการ: {serviceName}</p>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex flex-col items-center">
            {/* Face detection visualization */}
            <div className={`w-56 h-56 rounded-full border-4 ${
              scanStatus === 'scanning' ? 'border-yellow-400 animate-pulse' :
              scanStatus === 'success' ? 'border-green-500' :
              scanStatus === 'failed' ? 'border-red-500' :
              'border-gray-300'
            } mb-4 relative overflow-hidden`}>
              
              <div className="absolute inset-0 flex items-center justify-center">
                {scanStatus === 'ready' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                )}
                
                {scanStatus === 'scanning' && (
                  <div className="w-full h-full relative">
                    <div 
                      className="absolute inset-0 bg-yellow-100 opacity-20 flex items-center justify-center"
                      style={{ clipPath: `inset(${100 - scanProgress}% 0 0 0)` }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full h-0.5 bg-yellow-400 animate-pulse"></div>
                    </div>
                  </div>
                )}
                
                {scanStatus === 'success' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                
                {scanStatus === 'failed' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            
            {/* Status text */}
            <div className="text-center mb-6">
              {scanStatus === 'ready' && (
                <p className="text-gray-600">วางใบหน้าของคุณในกรอบและคลิกเริ่มการสแกน</p>
              )}
              {scanStatus === 'scanning' && (
                <p className="text-yellow-600">กำลังสแกน... {scanProgress}%</p>
              )}
              {scanStatus === 'success' && (
                <p className="text-green-600 font-medium">ยืนยันตัวตนสำเร็จ! เข้าถึงได้แล้ว</p>
              )}
              {scanStatus === 'failed' && (
                <p className="text-red-600 font-medium">การยืนยันล้มเหลว ลองอีกครั้งหรือใช้วิธีอื่น</p>
              )}
            </div>
            
            {/* Action buttons */}
            {scanStatus === 'ready' && (
              <button
                onClick={startScan}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium"
              >
                เริ่มการสแกนใบหน้า
              </button>
            )}
            
            {scanStatus === 'scanning' && (
              <button
                disabled
                className="w-full py-2 bg-yellow-400 text-white rounded-md font-medium opacity-80 cursor-not-allowed"
              >
                กำลังสแกน...
              </button>
            )}
            
            {scanStatus === 'success' && (
              <button
                onClick={onClose}
                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium"
              >
                ดำเนินการต่อ
              </button>
            )}
            
            {scanStatus === 'failed' && (
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setScanStatus('ready')}
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium"
                >
                  ลองอีกครั้ง
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2 border border-gray-300 hover:bg-gray-50 rounded-md font-medium"
                >
                  ใช้รหัสผ่าน
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedFaceAuthModal;
