import React from "react";

function Dashboard() {
  return (
    <div style={{
      background: "black",
      color: "white",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial"
    }}>
      <h1>Welcome to Dashboard</h1>
      <p>Your login was successful!</p>
    </div>
  );
}

export default Dashboard;
