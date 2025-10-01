import React, { useState, useEffect } from 'react';

interface Contractor {
  id: string;
  companyName: string;
  contactEmail: string;
  contactPhone?: string;
  totalProjects: number;
  totalRevenue: number;
}

const ContractorsPage: React.FC = () => {
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/contractors')
      .then(res => res.json())
      .then(data => {
        setContractors(data.contractors);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load contractors');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading contractors...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Contractor Management
      </h1>
      
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden' 
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                Company
              </th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                Contact
              </th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                Projects
              </th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {contractors.map((contractor, index) => (
              <tr key={contractor.id} style={{ borderBottom: index < contractors.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                <td style={{ padding: '16px 24px', fontWeight: '500' }}>{contractor.companyName}</td>
                <td style={{ padding: '16px 24px' }}>{contractor.contactEmail}</td>
                <td style={{ padding: '16px 24px' }}>{contractor.totalProjects}</td>
                <td style={{ padding: '16px 24px' }}>${contractor.totalRevenue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractorsPage;
