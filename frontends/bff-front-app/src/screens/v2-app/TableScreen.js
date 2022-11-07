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

export default function TableScreen() {
  const navigate = useNavigate();

    const [orders, setOrders] = React.useState([]);
    const [fullOrder, setFullOrder] = React.useState([]);

    const bffService = new BffService();
    const tableId = "1"
    //call useEffect each 30 seconds
    var cardStyle = {
        display: 'block',
        width: '30vw',
        transitionDuration: '0.3s',
        height: '45vw'
    }

    React.useEffect(() => {
      // const interval = setInterval(() => {
        
      // }, 1000);

      // return () => clearInterval(interval);
      getTableOrders(tableId);
      console.log("fjjjjjjjjjjjjjjjjjjjjjj")
    }, [orders]); 
  
  
    const getTableOrders = async (tableId) => {
      bffService.getTableOrders(tableId).then(response => { 
        setOrders(response.data);
        console.log(orders)
        console.log(orders.status)

      });
    };
    
    const validateTableOrders = async (tableId) => {
      bffService.validateTableOrders(tableId).then(response => { 
        fullOrder(response.data);
        console.log(orders)
        console.log(orders.status)

      });
    };
  
    return (
        <Grid sx={{ bgcolor: 'text.secondary', p:2 }}>
          <center><h2>Table Orders</h2></center>
          <Box sx={{ flexGrow: 1 }} >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {orders.map((value, index) => (
                <Grid item xs={"auto"} sm={4} md={4} key={index} style={cardStyle}>
                  <Card color="blue">
                    <CardContent>
                      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                      <center>Tablette N° {value.tabletNumber}</center>
                      </Typography>
                      {value.items.map((content, ind) =>(
                          <Typography>
                          <Stack direction="row" spacing={2}>
                            <Typography variant="h6" component="div">
                              <li>{content.shortName} * {content.quantity}</li>
                            </Typography>
                          </Stack>
                        </Typography>
                      )
                      )}
                      <Typography variant="h5" component="div">
                          Total : {value.price} $
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Button 
                  onClick={() => 
                    navigate("/orders-preparing")}
                  variant="contained" style={{
                    top: "80%",
                    width: "300px",
                    height: "60px",
                    align : "center",
                    position: "absolute",
                    left: "40%",
                    fontSize: "20px",
                  }}>
              Valider</Button>
            </Grid>
          </Box>
        </Grid>
    );
  }