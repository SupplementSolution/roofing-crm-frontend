import React, { useState, useEffect } from "react";

const CommissionManager = () => {
  const [commissions, setCommissions] = useState([]);
  const [summary, setSummary] = useState({ totalPending: 0, totalPaid: 0 });
  const [staff, setStaffs] = useState([]);

  useEffect(() => {
    fetchCommissions();
    fetchSummary();
    fetchStaffs();
  }, []);

  const fetchCommissions = async () => {
    try {
      const response = await fetch("https://api.estimate.company/api/commissions");
      const data = await response.json();
      setCommissions(data.commissions || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await fetch("https://api.estimate.company/api/commissions/summary");
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchStaffs = async () => {
    try {
      const response = await fetch("https://api.estimate.company/api/staff");
      const data = await response.json();
      setStaffs(data.staff || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateCommissionRate = async (staffId: string, rate: number) => {
    try {
      await fetch(`https://api.estimate.company/api/staff/${staffId}/commission-rate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rate })
      });
      fetchStaffs();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "1rem" }}>Commission Management</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "white", padding: "1rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Pending Commissions</div>
          <div style={{ fontSize: "20px", fontWeight: "bold", color: "#f59e0b" }}>
            ${summary.totalPending.toFixed(2)}
          </div>
        </div>
        <div style={{ background: "white", padding: "1rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Paid Commissions</div>
          <div style={{ fontSize: "20px", fontWeight: "bold", color: "#059669" }}>
            ${summary.totalPaid.toFixed(2)}
          </div>
        </div>
      </div>

      <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "1rem" }}>Staff Commission Rates</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ padding: "8px", textAlign: "left" }}>Staff</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Company</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Rate</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((staff: any) => (
                <tr key={staff.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "8px" }}>{staff.firstName} {staff.lastName}</td>
                  <td style={{ padding: "8px" }}>{staff.company || "N/A"}</td>
                  <td style={{ padding: "8px" }}>
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.01"
                      value={staff.commissionRate || 0.10}
                      onChange={(e) => updateCommissionRate(staff.id, parseFloat(e.target.value))}
                      style={{ width: "80px", padding: "4px", border: "1px solid #d1d5db", borderRadius: "4px" }}
                    />
                    <span style={{ marginLeft: "4px" }}>{((staff.commissionRate || 0.10) * 100).toFixed(0)}%</span>
                  </td>
                  <td style={{ padding: "8px" }}>
                    <button
                      style={{
                        padding: "4px 8px",
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px"
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommissionManager;
