import { Button, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItemTable from "../components/MenuItemTable";
import BffService from "../utils/BffService";

export default function OrderScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const bffService = new BffService();

    const handleOrder = () => {
        console.log("handleOrder");
        const items = []
        for (var [key, value] of location.state.items) {
            console.log(key + " goes " + value);
            items.push({"shortName":value["shortName"],"quantity":value["nb"]});
        }
        const order = {
            // "tableId": 3,
            "items": items
        };

        //order to json
        console.log("order: " + JSON.stringify(order));

        bffService.createOrder(order).then(response => {
            console.log("response: " + JSON.stringify(response.data));
            //navigate("/order-list");
        });
    };
    return (
        <div>
            {/* <h1>OrderScreen {location.state.items}</h1> */}
            <h1>Confirm order screen</h1>
            <MenuItemTable items={location.state.items} />
            <Grid container spacing={2} pt={4}>
                <Button
                    onClick={() => navigate(-1)}
                    sx={{ ml: 1 }}
                    variant="contained"
                    color="primary"
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleOrder}
                >
                    Confirm
                </Button>
            </Grid>
        </div>
    )
}