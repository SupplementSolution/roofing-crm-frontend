import React, { useState, useEffect } from "react";
import CompanyCamIntegration from "./CompanyCamIntegration";
import ProjectFileManager from "./components/ProjectFileManager";

const ProjectDetailsPage: React.FC<{projectId: string; onBack: () => void}> = ({ projectId, onBack }) => {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://api.estimate.company/api/projects/${projectId}`)
      .then(res => res.json())
      .then(projectData => {
        setProject(projectData.project);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch project:", err);
        setLoading(false);
      });
      
    fetch("https://api.estimate.company/api/staff")
      .then(res => res.json())
      .then(data => setStaff(data.staff || []))
      .catch(err => console.error("Failed to fetch staff:", err));
  }, [projectId]);

  const getStaffName = (staffId: string | null) => {
    if (!staffId) return "Not assigned";
    const staffMember = staff.find(s => s.id === staffId);
    return staffMember ? staffMember.name : "Not assigned";
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!project) return <div className="p-8">Project not found</div>;

  return (
    <div className="p-8">
      <button onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded mb-4">
        ← Back to Queue
      </button>
      <h1 className="text-2xl font-bold mb-4">Project Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-bold mb-4">Project Information</h2>
          <p><strong>Contractor:</strong> {project.contractorCompany}</p>
          <p><strong>Property:</strong> {project.propertyAddress}</p>
          <p><strong>Owner:</strong> {project.propertyOwnerName}</p>
          <p><strong>Status:</strong> {project.status}</p>
          <p><strong>Fee:</strong> ${project.totalCost}</p>
          <p><strong>Assigned Inspector:</strong> {getStaffName(project.assignedInspector)}</p>
          <p><strong>Assigned Estimator:</strong> {getStaffName(project.assignedEstimator)}</p>
          {project.assignedDate && (
            <p><strong>Assigned Date:</strong> {new Date(project.assignedDate).toLocaleDateString()}</p>
          )}
        </div>

        <CompanyCamIntegration projectId={projectId} />
      </div>

      <ProjectFileManager projectId={projectId} />
    </div>
  );
};

export default ProjectDetailsPage;
