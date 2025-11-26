import React from "react";

function GooglePage() {
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
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
        alt="google"
        style={{ width: "90px", marginBottom: "20px" }}
      />
      <h2>Google Standard Page</h2>
    </div>
  );
}

export default GooglePage;
