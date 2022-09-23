import * as React from "react";
import List from "@mui/material/List";
import CategoryItem from "../components/CategoryItem";
import CartDrawer from "../components/CartDrawer";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MenuItem from "../components/MenuItem";

export default function OrderScreen() {
  const [categories, setCategories] = React.useState([]);
  const [choosenCategory, setChoosenCategory] = React.useState("STARTER");
  const [menuItems, setMenuItems] = React.useState([]);
  const [choosenItems, setChoosenItems] = React.useState([]);

  React.useEffect(() => {
    fetchCategories();
    getMenuItemsbyCategory(choosenCategory);
  }, []);

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:8080/bff/menu/categories");
    const data = await response.json();
    console.log(data);
    setCategories(data);
    return data;
  };

  const getMenuItemsbyCategory = async (category) => {
    const response = await fetch("http://localhost:8080/bff/menu/" + category);
    const data = await response.json();
    console.log(data);
    setMenuItems(data);
    return data;
  };

  const chooseCategory = (category) => {
    setChoosenCategory(category);
    getMenuItemsbyCategory(category);
    console.log("choosen items: " + choosenItems);
  };

  const chooseItem = (item) => {
    const json_item = JSON.stringify(item);
    setChoosenItems([...choosenItems, json_item]);
    console.log("choosen items: " + choosenItems);
  };

  return (
    <div>
      <div style={{ position: "absolute" }}>
        <Paper style={{ maxHeight: 700, overflow: "auto" }}>
          <List
            sx={{
              width: "100%",
              maxWidth: 250,
              bgcolor: "background.paper",
              mb: 10,
            }}
          >
            {categories.map((value) => (
              <div onClick={() => chooseCategory(value.name)}>
                <CategoryItem
                  name={value.name}
                  image={value.image}
                  onClick={() => setChoosenCategory(value.name)}
                />
              </div>
            ))}
          </List>
        </Paper>
      </div>
      <div>
        <CartDrawer />
      </div>
      <Paper style={{ maxHeight: 700, overflow: "auto" }}>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          {choosenCategory}
        </h1>

        <Box sx={{ flexGrow: 1, ml: 45 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {menuItems.map((_, index) => (
              <Grid item xs={"auto"} sm={4} md={4} key={index}>
                <div onClick={() => chooseItem(_)}>
                  <MenuItem name={_.fullName} image={_.image} price={_.price} />
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}
