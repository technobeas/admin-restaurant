import React, { useEffect } from "react";

const SIDEBAR_WIDTH = 220;

const AdminHome = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 56px)",
        marginLeft: SIDEBAR_WIDTH,
        marginTop: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FAF7F5",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "32px 40px",
          borderRadius: "16px",
          boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
          textAlign: "center",
          maxWidth: "90%",
        }}
      >
        <h1
          style={{
            fontSize: "22px",
            fontWeight: "600",
            color: "#2B2B2B",
            marginBottom: "6px",
          }}
        >
          Welcome, Admin 👋
        </h1>

        <p
          style={{
            fontSize: "14px",
            color: "#6B5E57",
          }}
        >
          Manage your store with confidence
        </p>

        <div
          style={{
            marginTop: "14px",
            width: "40px",
            height: "3px",
            backgroundColor: "#5C4033",
            borderRadius: "2px",
            marginInline: "auto",
          }}
        />
      </div>

      {/* Mobile override */}
      <style>
        {`
          @media (max-width: 768px) {
            div[style] {
              margin-left: 0 !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AdminHome;
