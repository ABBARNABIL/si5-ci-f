import { Button, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItemTable from "../components/MenuItemTable";
import BffService from "../utils/BffService";
import {Container} from "@mui/material";
import React from "react";

export default function InvoiceScreen() {
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        setInterval(() => {
            navigate("/");
        }, 5000);
    }, []);
    
    return (
        <Container>
            {/* <h1>OrderScreen {location.state.items}</h1> */}
            <h3>Thank you for yor order. Below your invoice ...</h3>
            <h1>Invoice</h1>
            <MenuItemTable items={location.state.items} />
            <h3>Total price: {location.state.total}$</h3>
            <h3>Order id: {location.state.order['shortOrderId']} </h3>
            <h3>Table: {location.state.order['tableId']} </h3>
        </Container>
    )
}