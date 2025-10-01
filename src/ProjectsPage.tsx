interface ProjectsPageProps {
  onSelectProject: (projectId: string) => void;
}

import React, { useState, useEffect } from "react";

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/projects").then(res => res.json()),
      fetch("http://localhost:5000/api/staff").then(res => res.json())
    ]).then(([projectsData, staffData]) => {
      setProjects(projectsData.projects);
      setStaff(staffData.staff);
      setLoading(false);
    }).catch(err => setLoading(false));
  }, []);

  const assignStaff = async (projectId: string, assignedInspector: string, assignedEstimator: string, status: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedInspector, assignedEstimator, status })
      });

      if (response.ok) {
        const result = await response.json();
        setProjects(prev => prev.map(p => p.id === projectId ? result.project : p));
        setSuccessMessage(`Staff assigned successfully to project!`);
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (error) {
      console.error("Assignment failed:", error);
    }
  };

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}
  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Work Queue</h1>
      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-bold text-lg">{project.contractorCompany}</h2>
                <p><strong>Property:</strong> {project.propertyAddress}</p>
                <p><strong>Owner:</strong> {project.propertyOwnerName}</p>
                <p><strong>Status:</strong> <span className={`px-2 py-1 rounded text-sm ${
                  project.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                  project.status === "assigned" ? "bg-blue-100 text-blue-800" :
                  project.status === "in-progress" ? "bg-purple-100 text-purple-800" :
                  "bg-green-100 text-green-800"
                }`}>{project.status}</span></p>
                <p><strong>Fee:</strong> ${project.totalCost}</p>
              </div>
              <button
                onClick={() => onSelectProject(project.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                View Details
              </button>
            </div>
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Staff Assignment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Inspector:</label>
                  <select
                    value={project.assignedInspector || ""}
                    onChange={(e) => assignStaff(project.id, e.target.value, project.assignedEstimator || "", "assigned")}
                    className="w-full border rounded px-2 py-1 text-sm"
                  >
                    <option value="">Select Inspector</option>
                    {staff.filter(s => s.role === "inspector").map(inspector => (
                      <option key={inspector.id} value={inspector.id}>{inspector.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Estimator:</label>
                  <select
                    value={project.assignedEstimator || ""}
                    onChange={(e) => assignStaff(project.id, project.assignedInspector || "", e.target.value, "assigned")}
                    className="w-full border rounded px-2 py-1 text-sm"
                  >
                    <option value="">Select Estimator</option>
                    {staff.filter(s => s.role === "estimator").map(estimator => (
                      <option key={estimator.id} value={estimator.id}>{estimator.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status:</label>
                    <select
                      value={project.status}
                      onChange={(e) => assignStaff(project.id, project.assignedInspector || "", project.assignedEstimator || "", e.target.value)}
                      className="w-full border rounded px-2 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="assigned">Assigned</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
