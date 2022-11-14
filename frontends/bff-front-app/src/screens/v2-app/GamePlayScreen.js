import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function GamePlayScreen() {
  //navigate to the menu page

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
    </div>
  );
}
