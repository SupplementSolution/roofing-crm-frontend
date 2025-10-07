import React, { useState } from "react";

interface StaffLoginProps {
  onLoginSuccess: (user: any) => void;
  onBack: () => void;
}

export default function StaffLogin({ onLoginSuccess, onBack }: StaffLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://api.estimate.company/api/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        const user = { email: data.staff.email, role: data.staff.role, name: data.staff.name };
        onLoginSuccess(user);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "white", borderRadius: "1rem", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", padding: "3rem", maxWidth: "400px", width: "100%" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", textAlign: "center" }}>Staff Login</h2>
        {error && <div style={{ color: "#dc2626", marginBottom: "1rem" }}>{error}</div>}
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem", border: "1px solid #d1d5db", borderRadius: "0.5rem" }} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" style={{ width: "100%", padding: "0.75rem", marginBottom: "1.5rem", border: "1px solid #d1d5db", borderRadius: "0.5rem" }} />
        <button onClick={handleLogin} style={{ width: "100%", background: "#059669", color: "white", fontWeight: "600", padding: "0.75rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", marginBottom: "1rem" }}>Login</button>
        <button onClick={onBack} style={{ width: "100%", background: "#e5e7eb", color: "#374151", fontWeight: "600", padding: "0.75rem", borderRadius: "0.5rem", border: "none", cursor: "pointer" }}>Back</button>
      </div>
    </div>
  );
}
