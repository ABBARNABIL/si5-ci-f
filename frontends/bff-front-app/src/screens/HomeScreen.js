import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function HomeScreen() {
  //navigate to the menu page
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
        <source src={require("../assets/video.mp4")} type="video/mp4" />
      </video>
      <Button
        onClick={() => navigate("/tablette-order/1/1")}
        variant="contained"
        style={{
          top: "80%",
          width: "300px",
          height: "60px",
          position: "absolute",
          left: "33%",
          fontSize: "20px",
        }}
        endIcon={<SendIcon />}
        color="success"
      >
        Place Order
      </Button>
    </div>
  );
}
