import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "transparent",
        padding: "12px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 14,
        color: "white",
        position: "relative",
      }}
    >
      {/* Left - Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
          alt="BrainyLingo Logo"
          style={{ width: 30, height: 30 }}
        />
        <span style={{ fontWeight: "600", fontSize: 18 }}>BrainyLingo</span>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 40,
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        <Link to="/" style={{ color: "white", textDecoration: "none", opacity: 0.9 }}>
          Home
        </Link>
        <Link to="/" style={{ color: "white", textDecoration: "none", opacity: 0.9 }}>
          Leaderboard
        </Link>
        <Link to="/quiz" style={{ color: "white", textDecoration: "none", opacity: 0.9 }}>
          Daily Quiz
        </Link>
        <Link to="/" style={{ color: "white", textDecoration: "none", opacity: 0.9 }}>
          Genre
        </Link>
      </div>

      <Button
        type="primary"
        style={{
          background: "linear-gradient(90deg, #1e3a8a, #60a5fa)", 
          border: "none",
          borderRadius: 30,
          fontSize: 14,
          fontWeight: 600,
          padding: "18px 24px",
          color: "white",
        }}
      >
        Sign Out
      </Button>
    </nav>
  );
}
