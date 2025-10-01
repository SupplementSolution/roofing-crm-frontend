import React, { useState } from 'react';

interface CompanyCamIntegrationProps {
  projectId: string;
}

const CompanyCamIntegration: React.FC<CompanyCamIntegrationProps> = ({ projectId }) => {
  const [companyCamProjectId, setCompanyCamProjectId] = useState('');
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    if (!companyCamProjectId.trim()) {
      alert('Please enter a CompanyCam Project ID');
      return;
    }

    setSyncing(true);
    
    try {
      const response = await fetch('/api/projects/' + projectId + '/sync-companycam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyCamProjectId: companyCamProjectId.trim() })
      });

      if (response.ok) {
        const result = await response.json();
        alert('Successfully synced ' + result.synced_photos + ' photos from CompanyCam!');
        window.location.reload();
      } else {
        alert('Sync failed');
      }
    } catch (error) {
      alert('Failed to connect to CompanyCam');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow p-6">
      <h2 className="font-bold mb-4">CompanyCam Integration</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={companyCamProjectId}
          onChange={(e) => setCompanyCamProjectId(e.target.value)}
          placeholder="Enter CompanyCam project ID"
          className="w-full px-3 py-2 border rounded"
          disabled={syncing}
        />
        <button
          onClick={handleSync}
          disabled={syncing || !companyCamProjectId.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
        >
          {syncing ? 'Syncing...' : 'Sync Photos'}
        </button>
      </div>
    </div>
  );
};

export default CompanyCamIntegration;
