import React from "react";
import BffService from "../utils/BffService";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function OrderListScreen() {

  const [orders, setOrders] = React.useState([]);
  const bffService = new BffService();
  
  React.useEffect(() => {
    getOrders();
  }, [orders]);



  const getOrders = async () => {
    bffService.getOrders().then(response => {
      setOrders(response.data);
    });
  };

  console.log("orders: " + orders.length);

  return (
    <Container >
      <Grid sx={{ bgcolor: 'text.secondary', p:2 }}>
        <h2>Dining vision</h2>
        <center><h2>Orders list</h2></center>
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
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      N° {value.shortOrderId}
                    </Typography>
                    <Typography>
                      <Stack direction="row" spacing={2}>
                        <Typography variant="h7" component="div">
                          Table: {value.tableId}
                        </Typography>
                        {value.finished === true && <Chip label="READY" size="small" color="success" />}
                        {value.finished === false && value.started == true && <Chip label="STARTED" size="small" color="primary" />}
                        {value.finished === false && value.started == false && <Chip label="NOT READY" size="small" color="warning" />}
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