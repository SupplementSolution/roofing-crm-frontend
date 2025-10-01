import React, { useState } from 'react';
import './App.css';
import ContractorsPage from './ContractorsPage';
import ProjectsPage from './ProjectsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [apiStatus, setApiStatus] = React.useState<string>('Checking...');

  React.useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then((data: any) => setApiStatus(data.message))
      .catch(() => setApiStatus('API connection failed'));
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'contractors':
        return <ContractorsPage />;
      case 'projects':
        return <ProjectsPage />;
      default:
        return (
          <div className="App">
            <header className="App-header">
              <h1>Roofing Inspection Service Platform</h1>
              <p>Professional roof inspection, estimation, and reporting services for contractors</p>
              
              <div style={{ 
                marginTop: '2rem', 
                padding: '1rem', 
                background: '#f0f8ff', 
                borderRadius: '8px', 
                color: '#333' 
              }}>
                <h3>Platform Status</h3>
                <p><strong>Service API:</strong> {apiStatus}</p>
                <p><strong>Payment Processing:</strong> Ready</p>
                <p><strong>Database:</strong> Connected</p>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                  onClick={() => setCurrentPage('contractors')}
                  style={{
                    background: '#2563eb',
                    color: 'white',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  View Contractors
                </button>
                <button 
                  onClick={() => setCurrentPage('projects')}
                  style={{
                    background: '#059669',
                    color: 'white',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  View Projects
                </button>
              </div>
            </header>
          </div>
        );
    }
  };

  return (
    <div>
      {currentPage !== 'dashboard' && (
        <nav style={{ padding: '1rem', background: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
          <button 
            onClick={() => setCurrentPage('dashboard')}
            style={{ marginRight: '1rem', padding: '8px 16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setCurrentPage('contractors')}
            style={{ marginRight: '1rem', padding: '8px 16px', background: currentPage === 'contractors' ? '#2563eb' : '#e9ecef', color: currentPage === 'contractors' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Contractors
          </button>
          <button 
            onClick={() => setCurrentPage('projects')}
            style={{ padding: '8px 16px', background: currentPage === 'projects' ? '#059669' : '#e9ecef', color: currentPage === 'projects' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Projects
          </button>
        </nav>
      )}
      {renderPage()}
    </div>
  );
}

export default App;
