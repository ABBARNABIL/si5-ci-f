import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function PreparingScreen() {
  //navigate to the menu page

  return (
    <div className="login-wrapper">
    <h1>Your orders is preparing</h1>
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
        <source src={require("../../assets/preparing.mp4")} type="video/mp4" />
      </video>
    </div>
  );
}
