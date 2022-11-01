import { Button, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItemTable from "../components/MenuItemTable";
import BffService from "../utils/BffService";

export default function ConfirmOrderScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const bffService = new BffService();

  const handleOrder = () => {
    console.log("handleOrder");
    const items = [];
    for (var [key, value] of location.state.items) {
      items.push({ shortName: value["shortName"], quantity: value["nb"] });
    }

    const total = location.state.total;
    console.log("items " + total);

    const order = {
      items: items,
    };

    bffService.createOrder(order).then((response) => {
      console.log("response: " + JSON.stringify(response.data));
      navigate("/invoice", {
        state: {
          items: location.state.items,
          order: response.data,
          total: total,
        },
      });
    });
  };

  const handleOrderTablette = () => {
    console.log("handleOrder");
    const items = [];
    for (var [key, value] of location.state.items) {
      items.push({ shortName: value["shortName"], quantity: value["nb"] });
    }

    const total = location.state.total;
    console.log("items " + total);
    console.log("tableId " + location.state.tableId);
    console.log("tableId " + location.state.tabletteNumber);

    const tabletteOrder = {
      tableId: location.state.tableId,
      tabletNumber: location.state.tabletNumber,
      items: items,
    };

    bffService.createOrderTablette(tabletteOrder).then((response) => {
      console.log("response: " + JSON.stringify(response.data));
      navigate("/invoice", {
        state: {
          items: location.state.items,
          order: response.data,
          total: total,
        },
      });
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
          onClick={handleOrderTablette}
        >
          Confirm
        </Button>
      </Grid>
    </div>
  );
}
