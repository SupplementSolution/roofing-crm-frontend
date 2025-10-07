import React, { useState } from 'react';
import './App.css';
import ContractorsPage from './ContractorsPage';
import StaffPage from './StaffPage';
import ProjectsPage from './ProjectsPage';
import ProjectDetailsPage from './ProjectDetailsPage';
import ContractorLoginPage from "./ContractorLoginPage";
import ContractorDashboard from "./ContractorDashboard";
import DashboardPage from './DashboardPage';
import RoleBasedDashboard from "./components/RoleBasedDashboard";
import FinancialDashboard from "./components/financial/FinancialDashboard";
import ProjectRequestPage from './ProjectRequestPage';
import ContractorIntakePage from './ContractorIntakePage';
import LandingPage from "./LandingPage";

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"staff" | "contractor" | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = React.useState<string>('Checking...');

  React.useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedContractor = localStorage.getItem("loggedInContractor");
    if (savedUser) {
      setIsLoggedIn(true);
      setUserType("staff");
      const savedPage = localStorage.getItem("currentPage") || "dashboard";
      setCurrentPage(savedPage);
    } else if (savedContractor) {
      setIsLoggedIn(true);
      setUserType("contractor");
      setCurrentPage("contractor-intake");
    }
  }, []);

  React.useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then((data: any) => setApiStatus(data.message))
      .catch(() => setApiStatus('API connection failed'));
  }, []);
  if (currentPage === 'landing') {
    return <LandingPage onSelectUserType={(type: "staff" | "contractor") => {
      setUserType(type);
      setCurrentPage(type === "staff" ? "staff-login" : "contractor-login");
    }} />;
  }

  if (currentPage === 'staff-login') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '3rem', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Staff Login</h2>
          <input type="text" placeholder="Username" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
          <input type="password" placeholder="Password" style={{ width: '100%', padding: '0.75rem', marginBottom: '1.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
          <button onClick={() => { setIsLoggedIn(true); setCurrentPage('dashboard'); }} style={{ width: '100%', background: '#059669', color: 'white', fontWeight: '600', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', marginBottom: '1rem' }}>
            Login
          </button>
          <button onClick={() => setCurrentPage('landing')} style={{ width: '100%', background: '#e5e7eb', color: '#374151', fontWeight: '600', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
            Back
          </button>
        </div>
      </div>
    );
  }

  if (currentPage === 'contractor-login') {
    return <ContractorLoginPage onLogin={(contractor) => {
      localStorage.setItem("loggedInContractor", JSON.stringify(contractor));
      setIsLoggedIn(true);
      setCurrentPage('contractor-intake');
    }} />;
  }
  const renderPage = () => {
    if (currentPage === "project-details" && selectedProjectId) {
      return <ProjectDetailsPage projectId={selectedProjectId} onBack={() => setCurrentPage("projects")} />;
    }
    switch(currentPage) {
      case "contractor-intake":
        return <ContractorDashboard onNavigate={setCurrentPage} />;
      case "request":
        return <ProjectRequestPage />;
      case 'contractors':
        return <ContractorsPage />;
      case 'projects':
        return <ProjectsPage
          onSelectProject={(projectId: string) => {
            setSelectedProjectId(projectId);
            setCurrentPage('project-details');
          }}
        />;
      case 'staff':
        return <StaffPage />;
      case 'financial':
        return <FinancialDashboard />;
      case "dashboard":
        return <RoleBasedDashboard />;
      default:
        return <RoleBasedDashboard />;
    }
  };
  return (
    <div>
      <nav style={{
        padding: '1rem 2rem',
        background: 'white',
        borderBottom: '1px solid #dee2e6',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: '0 0 1rem 0', color: '#059669', fontSize: '1.8rem' }}>
          Roofing Inspection CRM
        </h1>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {[
            { key: 'dashboard', label: 'Dashboard' },
            { key: 'contractor-intake', label: 'Contractor Portal' },
            { key: 'request', label: 'Admin Request' },
            { key: 'projects', label: 'Work Queue' },
            { key: 'contractors', label: 'Contractors' },
            { key: 'staff', label: 'Staff' },
            { key: 'financial', label: 'Financial' }
          ].map(nav => (
            <button
              key={nav.key}
              onClick={() => { setCurrentPage(nav.key); localStorage.setItem("currentPage", nav.key); }}
              style={{
                padding: '0.5rem 1rem',
                background: currentPage === nav.key ? '#059669' : '#e9ecef',
                color: currentPage === nav.key ? 'white' : '#333',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              {nav.label}
            </button>
          ))}
        </div>
      </nav>
      <main style={{ minHeight: 'calc(100vh - 120px)', backgroundColor: '#f8f9fa' }}>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
