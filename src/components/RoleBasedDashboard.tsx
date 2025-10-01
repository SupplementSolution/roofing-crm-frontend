import React, { useState, useEffect } from "react";
import FinancialDashboard from "./financial/FinancialDashboard";

const RoleBasedDashboard = () => {
  const [userRole, setUserRole] = useState("INSPECTOR");
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setUserRole(user.role || "INSPECTOR");
  }, []);
  
  if (userRole === "ADMIN" || userRole === "MANAGER") {
    return <FinancialDashboard />;
  }
  
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Staff Dashboard</h1>
      <div style={{ marginTop: "1rem", background: "white", padding: "1.5rem", borderRadius: "8px" }}>
        <h2>My Projects</h2>
        <p>Your assigned projects will appear here</p>
      </div>
      <div style={{ marginTop: "1rem", background: "white", padding: "1.5rem", borderRadius: "8px" }}>
        <h2>My Commissions</h2>
        <p>Pending commission: $0.00</p>
      </div>
    </div>
  );
};

export default RoleBasedDashboard;
