import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography } from "@mui/material";

export default function GamePlayScreen() {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <video
        loop
        autoPlay
        muted
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          objectFit: "cover",
        }}
      >
        <source src={require("../../assets/game.mp4")} type="video/mp4" />
      </video>
      <Button
        onClick={() => navigate("/orders-preparing")}
        variant="contained"
        style={{
          width: "80px",
          height: "80px",
          top: "2%",
          position: "absolute",
          fontSize: "20px",
          backgroundColor: "#e6b400",
          borderRadius: "40px",
        }}
      >
        <ArrowBackIcon fontSize="large" />
      </Button>
    </div>
  );
}
