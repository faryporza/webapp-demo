import React from 'react';

interface CheckoutStepsProps {
  currentStep: 'info' | 'details' | 'payment' | 'confirmation';
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ currentStep }) => {
  const steps = [
    { id: 'info', name: 'Personal Information', status: currentStep === 'info' ? 'current' : currentStep === 'details' || currentStep === 'payment' || currentStep === 'confirmation' ? 'complete' : 'upcoming' },
    { id: 'details', name: 'Service Details', status: currentStep === 'details' ? 'current' : currentStep === 'payment' || currentStep === 'confirmation' ? 'complete' : 'upcoming' },
    { id: 'payment', name: 'Payment', status: currentStep === 'payment' ? 'current' : currentStep === 'confirmation' ? 'complete' : 'upcoming' },
    { id: 'confirmation', name: 'Confirmation', status: currentStep === 'confirmation' ? 'current' : 'upcoming' },
  ];

  return (
    <nav aria-label="Progress">
      <ol className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step, index) => (
          <li key={step.id} className="md:flex-1">
            <div className={`flex flex-col border-l-4 ${index === 0 ? 'md:border-l-0' : ''} md:border-l-0 md:border-t-4 py-2 pl-4 md:pl-0 md:pt-4 md:pb-0 ${step.status === 'complete' ? 'border-indigo-600' : step.status === 'current' ? 'border-indigo-500' : 'border-gray-200'}`}>
              <span className={`text-xs font-semibold tracking-wide uppercase ${step.status === 'complete' ? 'text-indigo-600' : step.status === 'current' ? 'text-indigo-500' : 'text-gray-500'}`}>
                Step {index + 1}
              </span>
              <span className="text-sm font-medium">{step.name}</span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CheckoutSteps;
