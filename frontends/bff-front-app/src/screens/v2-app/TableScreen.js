import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import BffService from "../../utils/BffService";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";

export default function TableScreen() {
  const navigate = useNavigate();

  const [orders, setOrders] = React.useState([]);
  const [fullOrder, setFullOrder] = React.useState([]);
  const { tableId } = useParams();
  const [openModal, setOpenModal] = React.useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    height: 100,
    bgcolor: "#E0BBE4",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 6,
    p: 4,
  };

  const bffService = new BffService();
  //call useEffect each 30 seconds
  var cardStyle = {
    display: "block",
    width: "30vw",
    transitionDuration: "0.3s",
    height: "45vw",
  };

  React.useEffect(() => {
    // const interval = setInterval(() => {

    // }, 1000);

    // return () => clearInterval(interval);
    getTableOrders(tableId);
    console.log("fjjjjjjjjjjjjjjjjjjjjjj");
  }, [orders]);

  const getTableOrders = async (tableId) => {
    bffService.getTableOrders(tableId).then((response) => {
      setOrders(response.data);
      console.log(orders);
      console.log(orders.status);
    });
  };

  const validateTableOrders = async (tableId) => {
    bffService.validateTableOrders(tableId).then((response) => {
      fullOrder(response.data);
      console.log(orders);
      console.log(orders.status);
    });
  };

  const handleOrderTable = () => {
    console.log("handleOrder");
    setOpenModal(true);
  };

  const handleChoice = () => {
    console.log("handleChoice");
    validateTableOrders(tableId);
    navigate("/orders-preparing");
  };

  return (
    <Grid sx={{ bgcolor: "text.secondary", p: 2 }}>
      <div>
        <Modal
          open={openModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                fontSize: 30,
              }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              You want to split the bill ?
            </Typography>
            <Button
              style={{ top: "20%", left: "10%" }}
              size={"large"}
              variant="contained"
              color="success"
              onClick={() => handleChoice()}
            >
              Yes
            </Button>
            <Button
              style={{ top: "20%", left: "50%" }}
              size={"large"}
              variant="contained"
              color="error"
              onClick={() => handleChoice()}
            >
              No
            </Button>
          </Box>
        </Modal>
      </div>
      <center>
        <h2>Table Orders</h2>
      </center>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {orders.map((value, index) => (
            <Grid item xs={"auto"} sm={4} md={4} key={index} style={cardStyle}>
              <Card color="blue">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <center>Tablette N° {value.tabletNumber}</center>
                  </Typography>
                  {value.items.map((content, ind) => (
                    <Typography>
                      <Stack direction="row" spacing={2}>
                        <Typography variant="h6" component="div">
                          <li>
                            {content.shortName} * {content.quantity}
                          </li>
                        </Typography>
                      </Stack>
                    </Typography>
                  ))}
                  <Typography variant="h5" component="div">
                    Total : {value.price} €
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
          onClick={handleOrderTable}
          variant="contained"
          style={{
            top: "80%",
            width: "300px",
            height: "60px",
            align: "center",
            position: "absolute",
            left: "40%",
            fontSize: "20px",
          }}
        >
          Valider
        </Button>
      </Box>
    </Grid>
  );
}
