import React, { useState } from "react";

const ProjectRequestPage: React.FC = () => {
  const [request, setRequest] = useState({
    contractorCompany: "",
    propertyAddress: "",
    propertyOwnerName: "",
    propertyOwnerPhone: "",
    urgency: "STANDARD"
  });

  const [calculatedFee, setCalculatedFee] = useState<number>(0);
  const [showPayment, setShowPayment] = useState(false);

  const calculateFee = () => {
    let totalFee = 1500;
    if (request.urgency === "PRIORITY") totalFee = 1800;
    if (request.urgency === "EMERGENCY") totalFee = 2000;
    setCalculatedFee(totalFee);
    setShowPayment(true);
  };

  const submitRequest = async () => {
    try {
      const response = await fetch("/api/projects/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...request, totalCost: calculatedFee, status: "PAID"})
      });
      if (response.ok) {
        alert("Request submitted successfully!");
      }
    } catch (error) {
      alert("Error submitting request");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Request Inspection Service</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label className="block mb-2 font-medium">Contractor Company</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={request.contractorCompany}
            onChange={(e) => setRequest({...request, contractorCompany: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Property Address</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={request.propertyAddress}
            onChange={(e) => setRequest({...request, propertyAddress: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Property Owner Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={request.propertyOwnerName}
            onChange={(e) => setRequest({...request, propertyOwnerName: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Property Owner Phone</label>
          <input
            type="tel"
            className="w-full border rounded px-3 py-2"
            value={request.propertyOwnerPhone}
            onChange={(e) => setRequest({...request, propertyOwnerPhone: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Service Level</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={request.urgency}
            onChange={(e) => setRequest({...request, urgency: e.target.value})}
          >
            <option value="STANDARD">Standard - $1,500</option>
            <option value="PRIORITY">Priority - $1,800</option>
            <option value="EMERGENCY">Emergency - $2,000</option>
          </select>
        </div>
        <button
          onClick={calculateFee}
          className="bg-blue-600 text-white px-6 py-2 rounded mr-4"
        >
          Calculate Fee
        </button>
        {showPayment && (
          <div className="mt-4 p-4 bg-green-50 rounded">
            <h3 className="text-lg font-bold mb-2">Total: ${calculatedFee.toLocaleString()}</h3>
            <button
              onClick={submitRequest}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Submit Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectRequestPage;
