import React from 'react';

interface DashboardPageProps {
  apiStatus: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ apiStatus }) => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>
        Roofing Inspection Service Platform
      </h1>
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        Professional roof inspection, estimation, and reporting services for contractors
      </p>

      {/* Status Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>Service API</h3>
          <p style={{ margin: '0', fontSize: '1.1rem', fontWeight: '500' }}>{apiStatus}</p>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>Payment Processing</h3>
          <p style={{ margin: '0', fontSize: '1.1rem', fontWeight: '500' }}>Ready</p>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>Database</h3>
          <p style={{ margin: '0', fontSize: '1.1rem', fontWeight: '500' }}>Connected</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{
            background: '#2563eb',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            Add New Project
          </button>
          <button style={{
            background: '#059669',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            Add New Client
          </button>
          <button style={{
            background: '#dc2626',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
