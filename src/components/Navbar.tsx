import React, { useState, useEffect } from 'react';
import CartIcon from './CartIcon';
import NotificationIcon from './NotificationIcon';
import SimpleFaceAuthButton from './face/SimpleFaceAuthButton';
import ServiceFaceAuth from './face/ServiceFaceAuth';
import EnhancedFaceAuthModal from './face/EnhancedFaceAuthModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentService, setCurrentService] = useState<{id: string, name: string} | null>(null);
  const [serviceAuthVisible, setServiceAuthVisible] = useState(false);
  const [faceAuthModalOpen, setFaceAuthModalOpen] = useState(false);
  
  // Demo function to simulate entering a service page
  useEffect(() => {
    // Simulate detecting a service page after 5 seconds
    const timer = setTimeout(() => {
      setCurrentService({ id: 'cleaning-1', name: 'บริการทำความสะอาด' });
      setServiceAuthVisible(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Button for quick face verification in navbar
  const renderFaceVerifyButton = () => {
    if (!currentService) return null;
    
    return (
      <button 
        onClick={() => setFaceAuthModalOpen(true)}
        className="ml-2 flex items-center text-sm bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-lg hover:from-indigo-600 hover:to-purple-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        ยืนยันตัวตนสำหรับ {currentService.name}
      </button>
    );
  };
  
  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-indigo-600">ServicePro</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="/" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  หน้าหลัก
                </a>
                <a href="/services" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  บริการ
                </a>
                <div className="relative group">
                  <button className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    หมวดหมู่
                    <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="absolute hidden group-hover:block z-10 w-48 bg-white rounded-md shadow-lg py-1">
                    <a href="/services/cleaning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">ทำความสะอาด</a>
                    <a href="/services/technician" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">ช่างเทคนิค</a>
                    <a href="/services/maintenance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">การดูแลบ้าน</a>
                  </div>
                </div>
                <a href="/demo" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  ทดลองใช้
                </a>
                <a href="/contact" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  ติดต่อเรา
                </a>
              </div>
            </div>
            <div className="flex items-center">
              {renderFaceVerifyButton()}
              <NotificationIcon />
              <CartIcon />
              <SimpleFaceAuthButton />
              <div className="ml-3 -mr-2 flex items-center sm:hidden">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  aria-expanded="false"
                >
                  <span className="sr-only">เปิดเมนูหลัก</span>
                  {!isOpen ? (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <a href="/" className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                หน้าหลัก
              </a>
              <a href="/services" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                บริการ
              </a>
              <div className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                หมวดหมู่
                <div className="pl-4 mt-2 space-y-1">
                  <a href="/services/cleaning" className="block py-2 text-sm text-gray-500 hover:text-gray-700">ทำความสะอาด</a>
                  <a href="/services/technician" className="block py-2 text-sm text-gray-500 hover:text-gray-700">ช่างเทคนิค</a>
                  <a href="/services/maintenance" className="block py-2 text-sm text-gray-500 hover:text-gray-700">การดูแลบ้าน</a>
                </div>
              </div>
              <a href="/demo" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                ทดลองใช้
              </a>
              <a href="/contact" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                ติดต่อเรา
              </a>
            </div>
          </div>
        )}
      </nav>
      
      <ServiceFaceAuth 
        isVisible={serviceAuthVisible} 
        serviceName={currentService?.name} 
        serviceId={currentService?.id}
      />
      
      <EnhancedFaceAuthModal
        isOpen={faceAuthModalOpen}
        onClose={() => setFaceAuthModalOpen(false)}
        serviceName={currentService?.name}
        onSuccess={() => {
          setTimeout(() => setFaceAuthModalOpen(false), 2000);
        }}
      />
    </>
  );
};

export default Navbar;
