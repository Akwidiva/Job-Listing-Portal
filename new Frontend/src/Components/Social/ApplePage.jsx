import React from "react";

function ApplePage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/0/747.png"
        alt="apple"
        style={{ width: "90px", marginBottom: "20px" }}
      />
      <h2>Apple Standard Page</h2>
    </div>
  );
}

export default ApplePage;
