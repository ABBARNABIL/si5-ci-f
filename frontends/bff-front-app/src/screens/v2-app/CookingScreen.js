import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import BffService from "../../utils/BffService";
import { Button, Chip } from "@mui/material";


export default function CookingScreen() {
  const [orders, setOrders] = React.useState([]);
  
    const bffService = new BffService();
    var cardStyle = {
        display: 'block',
        width: '30vw',
        transitionDuration: '0.3s',
        height: '45vw'
    }

    React.useEffect(() => {
      getTableOrders()
    }, [orders]); 
  
  
    const getTableOrders = async () => {
      bffService.getOrdersStatusByCategory().then(response => { 
        setOrders(response.data)
      });
    };

    const finishTableCategory = async (tableId, category ) =>{
      bffService.finishTableCategory(tableId, category).then(response => { 
        //setOrders(response.data)
      });
    }
  
    return (
        <Grid sx={{ p:2 }}>
          <center><h2>Cooking Screen</h2></center>
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
                      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                      <center>Table N° {value.tableId}</center>
                      </Typography>
                        <Typography>
                          <Stack direction="row" spacing={4}>
                            <Typography variant="h6" component="div">
                              Starter 
                            </Typography>
                            <Typography variant="h6" component="div">
                              {value.starter === false ? <Button variant="contained" size="small"  color="success" onClick={()=>{finishTableCategory(value.tableId, "STARTER")}}>Finish</Button> : <Chip label="Finished" size="small" color="primary" />}
                            </Typography>
                          </Stack>
                        </Typography>
                        <Typography>
                          <Stack direction="row" spacing={6}>
                            <Typography variant="h6" component="div">
                              Main 
                            </Typography>
                            <Typography variant="h6" component="div">
                            {value.main === false ? <Button variant="contained" color="success" size="small" onClick={()=>{finishTableCategory(value.tableId, "MAIN")}}>Finish</Button> : <Chip label="Finished" size="small" color="primary" />}
                            </Typography>
                          </Stack>
                        </Typography>
                        <Typography>
                          <Stack direction="row" spacing={3}>
                            <Typography variant="h6" component="div">
                              Dessert 
                            </Typography>
                            <Typography variant="h6" component="div">
                            {value.dessert === false ? <Button variant="contained" color="success" size="small" onClick={()=>{finishTableCategory(value.tableId, "DESSERT")}}>Finish</Button> : <Chip label="Finished" size="small" color="primary" />}
                            </Typography>
                          </Stack>
                        </Typography>
                        <Typography>
                          <Stack direction="row" spacing={2}>
                            <Typography variant="h6" component="div">
                              Beverage 
                            </Typography>
                            <Typography variant="h6" component="div">
                            {value.beverage === false ? <Button variant="contained" color="success" size="small" onClick={()=>{finishTableCategory(value.tableId, "BEVERAGE")}}>Finish</Button> : <Chip label="Finished" size="small" color="primary" />}
                            </Typography>
                          </Stack>
                        </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
    );
  }