import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useChat } from '../context/ChatContext';
import servicesData from '../data/services-data.json';

interface ServiceInfoProps {
  serviceId: string;
}

const ServiceInfo: React.FC<ServiceInfoProps> = ({ serviceId }) => {
  const service = servicesData.services.find(s => s.id === serviceId);
  const [selectedCategory, setSelectedCategory] = useState(service?.categories[0]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(
    selectedCategory ? Object.keys(selectedCategory.pricing)[0] : null
  );
  const { addToCart } = useCart();
  const { toggleChat, sendMessage } = useChat();

  if (!service) {
    return <div>Service not found</div>;
  }

  const handleAddToCart = () => {
    if (selectedCategory && selectedPrice) {
      const price = selectedCategory.pricing[selectedPrice];
      
      addToCart({
        id: `${serviceId}-${selectedCategory.id}-${selectedPrice}`,
        title: service.title,
        price: price,
        category: selectedCategory.name,
        image: service.imageUrl
      });
      
      // Show added to cart message (could use a toast notification in a real app)
      alert(`${selectedCategory.name} (${selectedPrice}) added to cart!`);
    }
  };

  // Handle chat with specialist
  const handleChatWithSpecialist = () => {
    toggleChat();
    setTimeout(() => {
      sendMessage(`I'm interested in learning more about ${service.title}, specifically the ${selectedCategory?.name} service.`);
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <img 
          className="w-full h-64 object-cover"
          src={service.imageUrl}
          alt={service.title}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="p-6">
            <h2 className="text-3xl font-bold text-white">{service.title}</h2>
            <p className="text-xl text-white mt-2">{service.description}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-3 mb-6">
          {service.categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory?.id === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedPrice(Object.keys(category.pricing)[0]);
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {selectedCategory && (
          <div className="mt-6">
            <h3 className="text-xl font-bold">{selectedCategory.name}</h3>
            <p className="text-gray-600 mt-2">{selectedCategory.description}</p>
            
            <div className="mt-6">
              <h4 className="text-lg font-semibold">Pricing Options</h4>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(selectedCategory.pricing).map(([key, value]) => (
                  <div 
                    key={key} 
                    className={`${
                      selectedPrice === key 
                        ? 'bg-indigo-50 border-indigo-600' 
                        : 'bg-gray-50 border-gray-200'
                    } p-4 rounded-lg border-2 cursor-pointer`}
                    onClick={() => setSelectedPrice(key)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-medium capitalize">{key.replace('-', ' ')}</div>
                      {selectedPrice === key && (
                        <svg className="h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-indigo-600">${value}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 px-4 py-3 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 flex items-center justify-center"
                  disabled={!selectedPrice}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
                <button 
                  onClick={handleChatWithSpecialist}
                  className="flex-1 px-4 py-3 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat with Specialist
                </button>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold">
                {selectedCategory.features ? 'What\'s Included' : 'Services Offered'}
              </h4>
              <ul className="mt-3 space-y-3">
                {(selectedCategory.features || selectedCategory.services || []).map((item, index) => (
                  <li key={index} className="flex">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceInfo;
