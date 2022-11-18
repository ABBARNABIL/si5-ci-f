import { useLocation, useNavigate } from "react-router-dom";
import MenuItemTable from "../components/MenuItemTable";
import { Container } from "@mui/material";
import React from "react";

export default function InvoiceScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container>
      {/* <h1>OrderScreen {location.state.items}</h1> */}
      <h3>Thank you for yor order. Below your invoice ...</h3>
      <h1>Invoice</h1>
      <MenuItemTable items={location.state.items} />
      <h3>Total price: {location.state.total}$</h3>
      <h3>Order id: {location.state.order["shortOrderId"]} </h3>
      <h3>Table: {location.state.order["tableId"]} </h3>
      <h3>Tablet: {location.state.order["tabletNumber"]} </h3>
    </Container>
  );
}
