interface ContractorIntakePageProps {
  onNavigate?: (page: string) => void;
}
import React, { useState } from "react";
import StripePaymentForm from "./StripePaymentForm";

const ContractorIntakePage: React.FC<ContractorIntakePageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    contractorCompany: "",
    contactEmail: "",
    contactPhone: "",
    propertyAddress: "",
    propertyOwnerName: "",
    propertyOwnerPhone: "",
    urgency: "STANDARD"
  });

  const [calculatedFee, setCalculatedFee] = useState<number>(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const calculateFee = () => {
    let totalFee = 1500;
    if (formData.urgency === "PRIORITY") totalFee = 1800;
    if (formData.urgency === "EMERGENCY") totalFee = 2000;
    setCalculatedFee(totalFee);
  };

  const nextStep = () => {
    if (step === 2) calculateFee();
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handlePaymentSuccess = async () => {
    console.log("Payment success, creating project with data:", formData);
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          calculatedFee: calculatedFee
        })
      });
      
      console.log("Response status:", response.status);
      
      if (response.ok) {
        console.log("Project created successfully");
        setPaymentSuccess(true);
        setStep(4);
      } else {
        console.log("Project creation failed:", await response.text());
        alert("Payment succeeded but failed to create project record");
      }
    } catch (error) {
      console.log("Error creating project:", error);
      alert("Payment succeeded but failed to create project record");
    }
  };

  const handlePaymentError = (error: string) => {
    alert(`Payment failed: ${error}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Contractor Portal</h1>
        <button 
          onClick={() => window.location.href = "/"} 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ← Back to Dashboard
        </button>
      </div>
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Professional Roofing Inspection Service
          </h1>
          <p className="text-gray-600 mt-2">
            Request inspection, estimation, and reporting services
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-4">
              {[1, 2, 3].map(num => (
                <div key={num} className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  {num}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-500">Step {step} of 3</span>
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-2">Company Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full border rounded px-3 py-2"
                    value={formData.contractorCompany}
                    onChange={(e) => setFormData({...formData, contractorCompany: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2">Contact Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full border rounded px-3 py-2"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={nextStep}
                  disabled={!formData.contractorCompany || !formData.contactEmail}
                  className="bg-blue-600 text-white px-6 py-2 rounded disabled:bg-gray-300"
                >
                  Next: Property Details
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Property Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-2">Property Address *</label>
                  <input
                    type="text"
                    required
                    className="w-full border rounded px-3 py-2"
                    value={formData.propertyAddress}
                    onChange={(e) => setFormData({...formData, propertyAddress: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium mb-2">Property Owner Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full border rounded px-3 py-2"
                      value={formData.propertyOwnerName}
                      onChange={(e) => setFormData({...formData, propertyOwnerName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Property Owner Phone *</label>
                    <input
                      type="tel"
                      required
                      className="w-full border rounded px-3 py-2"
                      value={formData.propertyOwnerPhone}
                      onChange={(e) => setFormData({...formData, propertyOwnerPhone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-2">Service Urgency</label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={formData.urgency}
                    onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                  >
                    <option value="STANDARD">Standard Service - $1,500</option>
                    <option value="PRIORITY">Priority Service - $1,800</option>
                    <option value="EMERGENCY">Emergency Service - $2,000</option>
                  </select>
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  onClick={prevStep}
                  className="bg-gray-500 text-white px-6 py-2 rounded"
                >
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                  Next: Payment
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Secure Payment</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded p-6">
                  <h3 className="font-bold mb-4">Service Summary</h3>
                  <div className="space-y-2">
                    <p><strong>Company:</strong> {formData.contractorCompany}</p>
                    <p><strong>Property:</strong> {formData.propertyAddress}</p>
                    <p><strong>Owner:</strong> {formData.propertyOwnerName}</p>
                    <p><strong>Service Level:</strong> {formData.urgency}</p>
                  </div>
                </div>

                <div>
                  <StripePaymentForm
                    amount={calculatedFee}
                    projectData={formData}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-start">
                <button
                  onClick={prevStep}
                  className="bg-gray-500 text-white px-6 py-2 rounded"
                >
                  Previous
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
              <p className="text-gray-600 mb-4">
                Your inspection request has been received and payment processed.
              </p>
              <div className="bg-green-50 rounded p-4">
                <p className="font-medium">What happens next:</p>
                <p>1. Email confirmation sent to {formData.contactEmail}</p>
                <p>2. Our team will contact property owner within 24 hours</p>
                <p>3. Inspection scheduled and completed</p>
                <p>4. Detailed report delivered via email</p>
              </div>
              <div className="mt-6 space-y-3">
                <button 
                  onClick={() => window.location.href = "/"} 
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700"
                >
                  Return to Dashboard
                </button>
                <button 
                  onClick={() => onNavigate?.("projects")} 
                  className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700"
                >
                  View All Projects
                </button>
                <button 
                  onClick={() => window.location.reload()} 
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractorIntakePage;
