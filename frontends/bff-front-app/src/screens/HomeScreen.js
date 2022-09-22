import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";

export default function HomeScreen() {
  const urlHost = "http://localhost:3000/menus";

  //navigate to the menu page
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  const getHeaders = () => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    };
    return headers;
  };

  const getCategories = () => {
    //cors
    axios
      .get(urlHost, { headers: getHeaders() })
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        console.log("Error n " + error);
      });
  };

  return (
    <div className="login-wrapper">
      <Button onClick={() => navigate("/order")} variant="contained">
        Contained
      </Button>
    </div>
  );
}
