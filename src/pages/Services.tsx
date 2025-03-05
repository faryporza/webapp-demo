import React from 'react';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
  categories: string[];
  price: number;
}

const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  return (
    <div className="bg-white overflow-hidden shadow-lg rounded-lg">
      <img 
        className="w-full h-48 object-cover" 
        src={service.image} 
        alt={service.title} 
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
        <p className="mt-2 text-gray-600">{service.description}</p>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900">Categories:</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {service.categories.map((category, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900">Price:</h4>
          <p className="mt-2 text-gray-600">${service.price.toFixed(2)}</p>
        </div>
        
        <div className="mt-6">
          <button className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      id: 1,
      title: 'บริการทำความสะอาด',
      description: 'บริการทำความสะอาดมืออาชีพสำหรับบ้านและธุรกิจ',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      categories: ['ที่พักอาศัย', 'เชิงพาณิชย์', 'ทำความสะอาดเชิงลึก', 'หลังก่อสร้าง'],
      price: 149.99
    },
    {
      id: 2,
      title: 'ช่างซ่อมเครื่องใช้ไฟฟ้า',
      description: 'ช่างซ่อมเครื่องใช้ไฟฟ้าที่มีความเชี่ยวชาญ',
      image: 'https://static.thairath.co.th/media/4DQpjUtzLUwmJZZSDrwUqaqxcgNDH2ygTAbMVcZq6WiZ.jpg',
      categories: ['ตู้เย็น', 'เครื่องซักผ้า', 'เครื่องอบผ้า', 'เตาอบ'],
      price: 199.99
    },
    {
      id: 3,
      title: 'ช่างแอร์ ช่างไฟฟ้า ช่างประปา',
      description: 'ช่างที่มีความเชี่ยวชาญในการซ่อมบำรุงและซ่อมแซมทุกปัญหาของคุณ',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxzlkZnSSaQfoKgdi8nRYh5vS5-mN_HeMBKg&s',
      categories: ['แอร์', 'ไฟฟ้า', 'ประปา', 'ซ่อมเครื่องใช้ไฟฟ้า'],
      price: 129.99
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">บริการของเรา</h2>
            <p className="mt-4 text-xl text-gray-500">
            เลือกจากบริการมืออาชีพที่หลากหลายของเรา
            </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
