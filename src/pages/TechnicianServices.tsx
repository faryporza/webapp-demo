import React from 'react';

const TechnicianServices: React.FC = () => {
const techServices = [
    {
        id: 1,
        title: 'บริการระบบปรับอากาศ',
        description: 'บริการติดตั้งและซ่อมบำรุงระบบทำความร้อน ระบายอากาศ และปรับอากาศครบวงจร',
        services: [
            'ติดตั้งและเปลี่ยนระบบใหม่',
            'การบำรุงรักษาเชิงป้องกัน',
            'ซ่อมฉุกเฉิน',
            'ตรวจสอบคุณภาพอากาศ'
        ]
    },
    {
        id: 2,
        title: 'บริการด้านไฟฟ้า',
        description: 'บริการด้านไฟฟ้าที่ปลอดภัยและเชื่อถือได้สำหรับบ้านหรือธุรกิจของคุณ',
        services: [
            'อัพเกรดแผงควบคุมไฟฟ้า',
            'ติดตั้งระบบไฟฟ้าและแสงสว่าง',
            'เปลี่ยนเต้ารับและสวิตช์',
            'ตรวจสอบความปลอดภัย'
        ]
    },
    {
        id: 3,
        title: 'บริการด้านประปา',
        description: 'บริการแก้ไขปัญหาระบบประปาทุกรูปแบบโดยผู้เชี่ยวชาญ',
        services: [
            'ซ่อมและเปลี่ยนท่อ',
            'ติดตั้งสุขภัณฑ์',
            'ล้างท่อระบายน้ำ',
            'บริการเครื่องทำน้ำร้อน'
        ]
    },
    {
        id: 4,
        title: 'ซ่อมเครื่องใช้ไฟฟ้า',
        description: 'บริการซ่อมเครื่องใช้ไฟฟ้าภายในบ้านโดยผู้เชี่ยวชาญ',
        services: [
            'ซ่อมตู้เย็น',
            'บริการเครื่องซักผ้าและเครื่องอบผ้า',
            'ซ่อมบำรุงเครื่องล้างจาน',
            'ซ่อมเตาอบและเตาทำอาหาร'
        ]
    }
];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">การสมัครงานช่างเทคนิค</h2>
          <p className="mt-4 text-xl text-gray-500">
            ช่างผู้เชี่ยวชาญพร้อมแก้ไขปัญหาการซ่อมบำรุงทุกความต้องการของคุณ
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {techServices.map((service) => (
            <div key={service.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900">What we offer:</h4>
                  <ul className="mt-3 space-y-2">
                    {service.services.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Schedule Service
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h3 className="text-2xl font-bold text-gray-900">Become a Technician</h3>
            <p className="mt-2 text-gray-600">
              Join our team of professional technicians. We're looking for skilled individuals with experience in HVAC, electrical, plumbing, or appliance repair.
            </p>
            <div className="mt-8">
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianServices;
