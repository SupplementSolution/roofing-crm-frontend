import React, { useState, useEffect } from "react";
import CommissionManager from "./CommissionManager";

const FinancialDashboard = () => {
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    profit: 0,
    pendingInvoices: 0,
    paidInvoices: 0
  });

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await fetch("https://api.estimate.company/api/financial/summary");
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", background: "#f9fafb", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "2rem" }}>
        Financial Dashboard
      </h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Total Revenue</div>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>${summary.totalRevenue.toFixed(2)}</div>
        </div>
        
        <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Total Expenses</div>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>${summary.totalExpenses.toFixed(2)}</div>
        </div>
        
        <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Net Profit</div>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: summary.profit >= 0 ? "#059669" : "#dc2626" }}>
            ${summary.profit.toFixed(2)}
          </div>
        </div>
        
        <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Pending Invoices</div>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>{summary.pendingInvoices}</div>
          <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>Paid: {summary.paidInvoices}</div>
        </div>
      </div>
      
      <CommissionManager />
    </div>
  );
};

export default FinancialDashboard;
