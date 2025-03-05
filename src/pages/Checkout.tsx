import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import OrderSummary from '../components/checkout/OrderSummary';
import CustomerInfoForm from '../components/checkout/CustomerInfoForm';
import ServiceDetailsForm from '../components/checkout/ServiceDetailsForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderConfirmation from '../components/checkout/OrderConfirmation';

type CheckoutStep = 'info' | 'details' | 'payment' | 'confirmation';

const Checkout: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('info');
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [serviceDetails, setServiceDetails] = useState({
    date: '',
    time: '',
    specialInstructions: ''
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Handle step navigation
  const nextStep = () => {
    switch (currentStep) {
      case 'info':
        setCurrentStep('details');
        break;
      case 'details':
        setCurrentStep('payment');
        break;
      case 'payment':
        // Submit order and generate order ID
        const generatedOrderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        setOrderId(generatedOrderId);
        setOrderCompleted(true);
        setCurrentStep('confirmation');
        clearCart(); // Clear cart after successful order
        break;
      default:
        break;
    }
  };

  const prevStep = () => {
    switch (currentStep) {
      case 'details':
        setCurrentStep('info');
        break;
      case 'payment':
        setCurrentStep('details');
        break;
      default:
        break;
    }
  };

  // Handle form changes
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setServiceDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Render different step forms based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 'info':
        return (
          <CustomerInfoForm
            customerInfo={customerInfo}
            handleChange={handleCustomerInfoChange}
            onSubmit={nextStep}
          />
        );
      case 'details':
        return (
          <ServiceDetailsForm
            serviceDetails={serviceDetails}
            handleChange={handleServiceDetailsChange}
            onBack={prevStep}
            onNext={nextStep}
            services={items}
          />
        );
      case 'payment':
        return (
          <PaymentForm
            paymentDetails={paymentDetails}
            handleChange={handlePaymentChange}
            onBack={prevStep}
            onSubmit={nextStep}
          />
        );
      case 'confirmation':
        return (
          <OrderConfirmation
            orderId={orderId}
            customerInfo={customerInfo}
            services={items}
            serviceDetails={serviceDetails}
            total={total}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  if (items.length === 0 && !orderCompleted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some services to your cart before checking out.</p>
          <a href="/services" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            Browse Services
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
      
      <CheckoutSteps currentStep={currentStep} />
      
      <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
        <div className="lg:col-span-7">
          {renderStepContent()}
        </div>
        
        <div className="mt-10 lg:mt-0 lg:col-span-5">
          <OrderSummary 
            items={items} 
            total={total} 
            customerInfo={currentStep === 'confirmation' ? customerInfo : undefined}
            serviceDetails={currentStep === 'confirmation' ? serviceDetails : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
