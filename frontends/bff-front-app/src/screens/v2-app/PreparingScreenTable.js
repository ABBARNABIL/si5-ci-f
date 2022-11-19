import React from "react";
import { useNavigate } from "react-router-dom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Button from "@mui/material/Button";

export default function PreparingScreenTable() {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <h1 style={{ left: "10%" }}> Preparing your order...</h1>
      <video
        loop
        autoPlay
        muted
        style={{
          height: "85%",
          width: "100%",
          position: "absolute",
          objectFit: "cover",
        }}
      >
        <source src={require("../../assets/preparing.mp4")} type="video/mp4" />
      </video>
      <Button
        onClick={() => navigate("/table-orders-tracking")}
        variant="contained"
        style={{
          top: "80%",
          width: "300px",
          height: "60px",
          position: "absolute",
          left: "36%",
          fontSize: "20px",
          backgroundColor: "#21b6ae",
          borderRadius: "18px",
        }}
      >
        Track Orders
      </Button>
    </div>
  );
}
