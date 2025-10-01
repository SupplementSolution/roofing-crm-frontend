import React, { useState } from "react";

const ContractorLoginPage: React.FC<{ onLogin: (contractor: any) => void }> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
    contactName: "",
    phone: "",
    address: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "register";
    
    try {
      const response = await fetch(`http://localhost:5000/api/contractors/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("contractor", JSON.stringify(data.contractor));
        onLogin(data.contractor);
      } else {
        alert(data.error || "Authentication failed");
      }
    } catch (error) {
      alert("Connection error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? "Contractor Login" : "Contractor Registration"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full mb-4 px-4 py-2 border rounded"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full mb-4 px-4 py-2 border rounded"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Company Name"
                required
                className="w-full mb-4 px-4 py-2 border rounded"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              />
              <input
                type="text"
                placeholder="Contact Name"
                required
                className="w-full mb-4 px-4 py-2 border rounded"
                value={formData.contactName}
                onChange={(e) => setFormData({...formData, contactName: e.target.value})}
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full mb-4 px-4 py-2 border rounded"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full mb-4 px-4 py-2 border rounded"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </>
          )}
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm">
          {isLogin ? "Need an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default ContractorLoginPage;
