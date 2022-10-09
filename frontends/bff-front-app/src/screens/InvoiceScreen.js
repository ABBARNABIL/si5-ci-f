import { Button, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItemTable from "../components/MenuItemTable";
import BffService from "../utils/BffService";
import {Container} from "@mui/material";

export default function InvoiceScreen() {
    const location = useLocation();
    const navigate = useNavigate();

    console.log("eeee "+location.state.order);

    
    return (
        <Container>
            {/* <h1>OrderScreen {location.state.items}</h1> */}
            <h1>Invoice</h1>
            <MenuItemTable items={location.state.items} />
            <h5>Total: {location.state.total}</h5>
            <h5>Order id: {location.state.order['orderId']} </h5>
            <h5>Table: {location.state.order['tableId']} </h5>
        </Container>
    )
}