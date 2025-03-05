import React from 'react';
import JsonDemoPanel from '../components/JsonDemoPanel';
import ServiceInfo from '../components/ServiceInfo';

const Demo: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Interactive Demo</h2>
          <p className="mt-4 text-xl text-gray-500">
            Explore our services data and see how our components render from JSON
          </p>
        </div>

        <JsonDemoPanel />
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Cleaning Services Showcase</h3>
          <ServiceInfo serviceId="cleaning-services" />
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Technical Services Showcase</h3>
          <ServiceInfo serviceId="technician-services" />
        </div>
        
        
      </div>
    </div>
  );
};

export default Demo;
