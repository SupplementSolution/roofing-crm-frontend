import React, { useState, useEffect } from "react";

const ContractorsPage: React.FC = () => {
  const [contractors, setContractors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/contractors")
      .then(res => res.json())
      .then(data => {
        setContractors(data.contractors || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch contractors:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Registered Contractors</h1>
      {contractors.length === 0 ? (
        <p>No contractors registered yet.</p>
      ) : (
        <div className="grid gap-4">
          {contractors.map(contractor => (
            <div key={contractor.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg">{contractor.companyName}</h3>
              <p className="text-gray-600">Contact: {contractor.contactName}</p>
              <p className="text-gray-600">Email: {contractor.email}</p>
              <p className="text-gray-600">Phone: {contractor.phone || "N/A"}</p>
              <p className="text-sm text-gray-500 mt-2">
                Projects: {contractor._count?.projects || 0}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContractorsPage;
