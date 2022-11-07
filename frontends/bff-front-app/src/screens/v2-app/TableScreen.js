import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import BffService from "../../utils/BffService";
import Button from '@mui/material/Button';

export default function TableScreen() {
    const [orders, setOrders] = React.useState([]);
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
  
  
    return (
        <Grid sx={{ bgcolor: 'text.secondary', p:2 }}>
          <h2>Dining vision</h2>
          <center><h2></h2></center>
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
                        Tablette N° {index+1}
                      </Typography>
                      <Typography>
                        <Stack direction="row" spacing={2}>
                          <Typography variant="h7" component="div">
                             Table: {value.shortName} 
                          </Typography>
                          
                        </Stack>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Button variant="contained" style={{
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