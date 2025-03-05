import React from 'react';
import { useCart } from '../context/CartContext';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
  categories: string[];
  price?: number; // Added price field
}

const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const { addToCart } = useCart();
  
  // Default price if not specified
  const price = service.price || 99.99;

  const handleAddToCart = () => {
    addToCart({
      id: service.id.toString(),
      title: service.title,
      price: price,
      image: service.image,
      category: service.categories[0]
    });
  };

  return (
    <div className="bg-white overflow-hidden shadow-lg rounded-lg">
      <img 
        className="w-full h-48 object-cover" 
        src={service.image} 
        alt={service.title} 
      />
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
          <div className="text-xl font-bold text-indigo-600">${price}</div>
        </div>
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
        
        <div className="mt-6 flex space-x-2">
          <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Learn More
          </button>
          <button 
            onClick={handleAddToCart}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
