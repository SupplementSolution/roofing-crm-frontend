import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardElement,
  Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51S9wlCLKWVr7MJNFIl5pflt0OUsUdVspoQcCzePMgtB2z8g5jD0vLmE3i6QcONFANGHYMULawlh2MRUvUAR5Wd0F007XyeIC9R');

interface PaymentFormProps {
  amount: number;
  projectData: any;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, projectData, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    try {
      const response = await fetch('http://localhost:5000/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,
          projectData
        })
      });

      const { clientSecret: client_secret } = await response.json();

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: projectData.contractorCompany,
            email: projectData.contactEmail
          }
        }
      });

      if (result.error) {
        onError(result.error.message || 'Payment failed');
      } else {
        onSuccess();
      }
    } catch (error) {
      onError('Payment processing error');
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-gray-50 p-4 rounded">
        <h3 className="font-bold mb-2">Payment Details</h3>
        <p className="text-2xl font-bold text-green-600">
          ${amount.toLocaleString()}
        </p>
      </div>
      
      <div className="border p-4 rounded">
        <label className="block font-medium mb-2">Card Information</label>
        <CardElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-green-600 text-white py-3 px-6 rounded font-medium disabled:bg-gray-400"
      >
        {processing ? 'Processing...' : `Pay $${amount.toLocaleString()}`}
      </button>

      <p className="text-sm text-gray-500 text-center">
        Test card: 4242 4242 4242 4242
      </p>
    </form>
  );
};

const StripePaymentForm: React.FC<PaymentFormProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
};

export default StripePaymentForm;
