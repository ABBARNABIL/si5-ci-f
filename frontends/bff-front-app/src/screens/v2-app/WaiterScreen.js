import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import BffService from "../../utils/BffService";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Chip } from "@mui/material";


export default function WaiterScreen() {
  
    const bffService = new BffService();
    var cardStyle = {
        display: 'block',
        width: '30vw',
        transitionDuration: '0.3s',
        height: '45vw'
    }

    React.useEffect(() => {
      //getOrdersByPost
    }, []); 
  
  
    const getTableOrders = async () => {
      bffService.getAllTableOrders().then(response => { 
        console.log("all orders")

      });
    };
  
    return (
        <Grid sx={{ p:2 }}>
          <center><h2>Waiter Screen</h2></center>
          <Box sx={{ flexGrow: 1 }} >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {/* {orders.map((value, index) => ( */}
                {/* <Grid item xs={"auto"} sm={4} md={4} key={index} style={cardStyle}> */}
                <Grid item xs={"auto"} sm={4} md={3}>
                  <Card color="blue">
                    <CardContent>
                      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                      <center>Table N° </center>
                      </Typography>
                      {/* {value.items.map((content, ind) =>( */}
                          <Typography>
                          <Stack direction="row" spacing={2}>
                            <Typography variant="h6" component="div">
                              HOT <Chip color="primary" label="READY" />
                            </Typography>
                          </Stack>
                        </Typography>
                      {/* ) */}
                      {/* )} */}
                    </CardContent>
                  </Card>
                </Grid>
              {/* ))} */}
            </Grid>
          </Box>
        </Grid>
    );
  }