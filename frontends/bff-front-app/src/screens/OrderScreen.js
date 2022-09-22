import * as React from "react";
import List from "@mui/material/List";
import CategoryItem from "../components/CategoryItem";
import CartDrawer from "../components/CartDrawer";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MenuItem from "../components/MenuItem";

export default function OrderScreen() {
  const [categories, setCategories] = React.useState([]);
  const [chooseCategory, setChooseCategory] = React.useState(null);
  const [menuItems, setMenuItems] = React.useState([]);

  React.useEffect(() => {
    getCategories();
    getMenuItems();
  }, []);

  const getCategories = () => {
    const categories = [
      {
        name: "STARTERS",
        image:
          "https://cdn.pixabay.com/photo/2020/02/27/20/13/cake-4885715_1280.jpg",
      },
      {
        name: "MAIN COURSE",
        image:
          "https://cdn.pixabay.com/photo/2020/02/27/20/13/cake-4885715_1280.jpg",
      },
      {
        name: "DESSERTS",
        image:
          "https://cdn.pixabay.com/photo/2020/02/27/20/13/cake-4885715_1280.jpg",
      },
      {
        name: "DRINKS",
        image:
          "https://cdn.pixabay.com/photo/2020/02/27/20/13/cake-4885715_1280.jpg",
      },
    ];
    setCategories(categories);
  };

  const getMenuItems = () => {
    const menuItems = [
      {
        name: "Pizza",
        image:
          "https://cdn.pixabay.com/photo/2020/02/27/20/13/cake-4885715_1280.jpg",
        price: 10,
      },
      {
        name: "Burger",
        image:
          "https://cdn.pixabay.com/photo/2020/02/27/20/13/cake-4885715_1280.jpg",
        price: 10,
      },
      {
        name: "Pasta",
        image:
          "https://cdn.pixabay.com/photo/2020/02/27/20/13/cake-4885715_1280.jpg",
        price: 10,
      },
    ];
    setMenuItems(menuItems);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>STARTER</h1>
      <div style={{ position: "absolute" }}>
        <List
          sx={{
            width: "100%",
            maxWidth: 250,
            bgcolor: "background.paper",
            mb: 10,
          }}
        >
          {categories.map((value) => (
            <CategoryItem name={value.name} image={value.image} />
          ))}
        </List>
      </div>
      <div>
        <CartDrawer />
      </div>
      <Box sx={{ flexGrow: 1, ml: 45 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {menuItems.map((_, index) => (
            <Grid item xs={"auto"} sm={4} md={4} key={index}>
              <MenuItem name={_.name} image={_.image} price={_.price} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
