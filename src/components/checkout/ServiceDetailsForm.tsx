import React from 'react';
import { CartItem } from '../../context/CartContext';

interface ServiceDetailsFormProps {
  serviceDetails: {
    date: string;
    time: string;
    specialInstructions: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBack: () => void;
  onNext: () => void;
  services: CartItem[];
}

// Helper function to get tomorrow's date
const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

// Helper function to get date 3 months from now
const getMaxDate = () => {
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  return maxDate.toISOString().split('T')[0];
};

const ServiceDetailsForm: React.FC<ServiceDetailsFormProps> = ({
  serviceDetails,
  handleChange,
  onBack,
  onNext,
  services
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  // Generate time slots from 8:00 AM to 5:00 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 17; hour++) {
      const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
      const amPm = hour < 12 ? 'AM' : 'PM';
      slots.push(`${hourFormatted}:00 ${amPm}`);
      if (hour !== 17) {
        slots.push(`${hourFormatted}:30 ${amPm}`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Service Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Preferred Service Date
            </label>
            <div className="mt-1">
              <input
                type="date"
                id="date"
                name="date"
                value={serviceDetails.date}
                onChange={handleChange}
                min={getTomorrowDate()}
                max={getMaxDate()}
                required
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Preferred Service Time
            </label>
            <div className="mt-1">
              <select
                id="time"
                name="time"
                value={serviceDetails.time}
                onChange={handleChange}
                required
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700">
              Special Instructions
            </label>
            <div className="mt-1">
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                rows={4}
                value={serviceDetails.specialInstructions}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Any specific requests or information we should know about..."
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-md font-medium text-gray-900">Services to be provided</h3>
            <ul className="mt-4 divide-y divide-gray-200">
              {services.map((item) => (
                <li key={item.id} className="py-4 flex">
                  {item.image && (
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover object-center" />
                    </div>
                  )}
                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h4>{item.title}</h4>
                        <p className="ml-4">${item.price.toFixed(2)}</p>
                      </div>
                      {item.category && <p className="mt-1 text-sm text-gray-500">{item.category}</p>}
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceDetailsForm;
