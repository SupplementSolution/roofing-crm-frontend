import React from "react";

const LandingPage = ({ onSelectUserType }: any) => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '1000px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#065f46', marginBottom: '1rem' }}>
            Roofing Inspection CRM
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#374151' }}>
            Professional Project Management & Inspection Services
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Staff Portal</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Access for inspectors, estimators, and staff</p>
            <button onClick={() => onSelectUserType('staff')} style={{ width: '100%', background: '#059669', color: 'white', fontWeight: '600', padding: '1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '1.125rem' }}>
              Staff Login
            </button>
          </div>
          <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Contractor Portal</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Access for roofing contractors and providers</p>
            <button onClick={() => onSelectUserType('contractor')} style={{ width: '100%', background: '#2563eb', color: 'white', fontWeight: '600', padding: '1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '1.125rem' }}>
              Contractor Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
