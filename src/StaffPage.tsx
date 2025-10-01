import React from "react";

const StaffPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Staff Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Inspector and Estimator management will show here</p>
        <div className="mt-4">
          <p>• Mike Johnson - Inspector (Active)</p>
          <p>• Sarah Williams - Estimator (Busy)</p>
          <p>• Tom Davis - Inspector (Available)</p>
        </div>
      </div>
    </div>
  );
};

export default StaffPage;
