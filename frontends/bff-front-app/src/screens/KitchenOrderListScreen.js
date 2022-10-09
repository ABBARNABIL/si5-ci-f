import React from "react";
import BffService from "../utils/BffService";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { Divider, Stack, Chip, Button } from "@mui/material";

export default function KitchenOrderListScreen() {

  const [orders, setOrders] = React.useState([]);
  const bffService = new BffService();
  
  React.useEffect(() => {
    getOrders();
  }, []);



  const getOrders = async () => {
    bffService.getOrders().then(response => {
      setOrders(response.data);
    });
  };

  console.log("ttttt: " + JSON.stringify(orders));

  return (
    <Container >
      <Grid sx={{ bgcolor: 'text.secondary', p:2 }}>
        <h2>Kitchen vision</h2>
        <center><h2>Orders</h2></center>
        <Box sx={{ flexGrow: 1 }} >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {orders.map((value, index) => (
              <Grid item xs={"auto"} sm={4} md={4} key={index}>
                <Card color="blue">
                  <CardContent>
                    <Typography>
                      <Stack direction="row" spacing={2}>
                        <Typography variant="h7" component="div">
                          Table: {value.tableId}
                        </Typography>
                        <Divider orientation="vertical" flexItem />
                        {value.ready === false && <Button size="small" variant="contained" color="primary" onClick={() => {bffService.updateOrder(value.orderId, true); getOrders();}}>START</Button>}
                        {value.ready === true && <Button size="small" variant="contained" color="secondary" onClick={() => {bffService.updateOrder(value.orderId, false); getOrders();}}>FINISH</Button>}
                      </Stack>
                      <Divider sx={{m:1}}/>
                      <Stack direction="column" spacing={1}>
                         {value.items.map((item, index) => (
                            <Stack> {item.shortName} x {item.quantity}</Stack>
                          ))}
                      </Stack>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
}