import React from 'react';

const CleaningServices: React.FC = () => {
  const cleaningTypes = [
    {
      id: 1,
      title: 'Residential Cleaning',
      description: 'Expert home cleaning services tailored to your specific needs',
      features: [
        'Weekly or bi-weekly recurring service',
        'Deep cleaning options',
        'Eco-friendly products available',
        'Trained and vetted professional cleaners'
      ]
    },
    {
      id: 2,
      title: 'Commercial Cleaning',
      description: 'Professional cleaning solutions for businesses of all sizes',
      features: [
        'Office sanitization',
        'Regular maintenance cleaning',
        'Window and floor cleaning',
        'After-hours service available'
      ]
    },
    {
      id: 3,
      title: 'Deep Cleaning',
      description: 'Thorough cleaning of every nook and cranny',
      features: [
        'Inside appliance cleaning',
        'Baseboards and trim cleaning',
        'Cabinet and drawer organization',
        'Ceiling fans and light fixtures'
      ]
    },
    {
      id: 4,
      title: 'Post Construction Cleaning',
      description: 'Make your new build or renovation shine',
      features: [
        'Debris removal',
        'Dust removal from all surfaces',
        'Final polish of fixtures and glass',
        'Ready-to-use property upon completion'
      ]
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Cleaning Services</h2>
          <p className="mt-4 text-xl text-gray-500">
            Professional cleaning solutions for homes and businesses
          </p>
        </div>

        <div className="mt-12">
          {cleaningTypes.map((service) => (
            <div key={service.id} className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900">Features:</h4>
                  <ul className="mt-3 space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CleaningServices;
