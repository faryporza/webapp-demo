import React, { useState, useEffect } from 'react';
import servicesData from '../data/services-data.json';

interface PricingItem {
  [key: string]: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  pricing: PricingItem;
  features?: string[];
  services?: string[];
}

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  categories: Category[];
}

const JsonDemoPanel: React.FC = () => {
  const [services] = useState<Service[]>(servicesData.services);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [jsonView, setJsonView] = useState<'formatted' | 'raw'>('formatted');

  useEffect(() => {
    if (services.length > 0) {
      setSelectedService(services[0]);
      setSelectedCategory(services[0].categories[0]);
    }
  }, [services]);

  if (!selectedService) return <div>Loading data...</div>;

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setSelectedCategory(service.categories[0]);
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const toggleView = () => {
    setJsonView(jsonView === 'formatted' ? 'raw' : 'formatted');
  };

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden my-8">
      <div className="border-b border-gray-200 bg-indigo-600 px-6 py-4">
        <h3 className="text-2xl font-bold text-white flex items-center justify-between">
          <span>Interactive JSON Demo Panel</span>
          <button 
            onClick={toggleView}
            className="px-3 py-1 text-sm bg-white text-indigo-600 rounded-md hover:bg-gray-100"
          >
            {jsonView === 'formatted' ? 'View Raw JSON' : 'View Formatted'}
          </button>
        </h3>
        <p className="text-indigo-100 text-sm mt-1">Click on services and categories to explore the data</p>
      </div>

      {jsonView === 'formatted' ? (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 bg-gray-50 p-4 border-r border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => handleServiceClick(service)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      selectedService?.id === service.id
                        ? 'bg-indigo-100 text-indigo-800 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-1/4 bg-white p-4 border-r border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
            {selectedService && (
              <ul className="space-y-2">
                {selectedService.categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        selectedCategory?.id === category.id
                          ? 'bg-indigo-100 text-indigo-800 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="md:w-2/4 bg-white p-4">
            <h4 className="font-medium text-gray-900 mb-3">Details</h4>
            {selectedCategory && (
              <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900">{selectedCategory.name}</h3>
                <p className="text-gray-600 mt-1">{selectedCategory.description}</p>
                
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900">Pricing</h4>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.entries(selectedCategory.pricing).map(([key, value]) => (
                      <div key={key} className="bg-white p-2 rounded border border-gray-200">
                        <div className="capitalize text-sm text-gray-500">{key.replace('-', ' ')}</div>
                        <div className="font-medium">${value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900">
                    {selectedCategory.features ? 'Features' : 'Services'}
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {(selectedCategory.features || selectedCategory.services || []).map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="bg-gray-900 rounded-md p-4 overflow-auto max-h-96">
            <pre className="text-green-400 text-sm">
              {selectedCategory ? 
                JSON.stringify(selectedCategory, null, 2) : 
                JSON.stringify(selectedService, null, 2)}
            </pre>
          </div>
        </div>
      )}
      
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Click on different services and categories to view the associated data.
        </div>
      </div>
    </div>
  );
};

export default JsonDemoPanel;
