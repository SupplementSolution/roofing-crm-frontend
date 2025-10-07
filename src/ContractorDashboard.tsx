import React, { useState, useEffect } from "react";

const ContractorDashboard: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [contractor, setContractor] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("loggedInContractor");
    if (saved) {
      const contractorData = JSON.parse(saved);
      setContractor(contractorData);
      fetchProjects(contractorData.id);
    }
  }, []);

  const fetchProjects = async (contractorId: string) => {
    try {
      const response = await fetch(`https://api.estimate.company/api/contractors/${contractorId}/projects`);
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Failed to fetch projects");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInContractor");
    window.location.reload();
  };

  if (!contractor) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {contractor.companyName}!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Your Information</h2>
        <p><strong>Company:</strong> {contractor.companyName}</p>
        <p><strong>Contact:</strong> {contractor.contactName}</p>
        <p><strong>Email:</strong> {contractor.email}</p>
        <p><strong>Phone:</strong> {contractor.phone || "Not provided"}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Your Projects ({projects.length})</h2>
        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          <div className="space-y-2">
            {projects.map(project => (
              <div key={project.id} className="border p-3 rounded">
                <p><strong>Property:</strong> {project.propertyAddress}</p>
                <p><strong>Status:</strong> {project.status}</p>
                <p><strong>Fee:</strong> ${project.totalCost}</p>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => onNavigate("contractor-intake")}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
        >
          Submit New Project
        </button>
      </div>
    </div>
  );
};

export default ContractorDashboard;
