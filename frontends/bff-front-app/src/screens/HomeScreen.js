import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function HomeScreen() {
  //navigate to the menu page
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <Button onClick={() => navigate("/order")} variant="contained">
        Place Order
      </Button>
      <Button onClick={() => navigate("/order-list")} variant="contained">
        Orders list
      </Button>
    </div>
  );
}
