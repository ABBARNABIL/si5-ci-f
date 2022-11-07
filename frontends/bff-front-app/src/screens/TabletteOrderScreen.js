import * as React from "react";
import { useParams } from "react-router-dom";
import DrawerCart from "../components/DrawerCart";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MenuItem from "../components/MenuItem";
import BffService from "../utils/BffService";
import QuantityModal from "../components/QuantityModal";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

export default function TabletteOrderScreen() {
  // const context = createContext();

  const [categories, setCategories] = React.useState([]);
  const [choosenCategory, setChoosenCategory] = React.useState("STARTER");
  const [menuItems, setMenuItems] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const bffService = new BffService();
  const [chooseItems, setChooseItems] = React.useState(new Map());
  const [countItems, setCountItems] = React.useState(0);
  const [openModal, setOpenModal] = React.useState();
  const [modalItemName, setModalItemName] = React.useState();
  const [selectedItem, setSelectedItem] = React.useState();

  const { tableId } = useParams();
  const { tabletNumber } = useParams();

  React.useEffect(() => {
    getCategories();
    getMenuItemsbyCategory(choosenCategory);
  }, []);

  const getCategories = async () => {
    bffService.getCategories().then((response) => {
      setCategories(response.data);
    });
  };

  const getMenuItemsbyCategory = async (category) => {
    bffService.getMenusByCategory(category).then((response) => {
      setMenuItems(response.data);
    });
  };

  const chooseCategory = (event, category) => {
    setChoosenCategory(category);
    getMenuItemsbyCategory(category);
  };

  const chooseItem = (item) => {
    setOpenModal(true);
    setModalItemName(item.fullName);
    setSelectedItem(item);
  };

  const addItemToCart = (item, quantity) => {
    if (chooseItems.has(item.fullName)) {
      setChooseItems(
        chooseItems.set(item.fullName, {
          pu: item.price,
          nb: chooseItems.get(item.fullName)["nb"] + quantity,
          shortName: item.shortName,
        })
      );
    } else {
      setChooseItems(
        chooseItems.set(item.fullName, {
          pu: item.price,
          nb: quantity,
          shortName: item.shortName,
        })
      );
    }
    setCountItems(countItems + quantity);
    setTotalPrice(totalPrice + item.price * quantity);
    setOpenModal(false);
    console.log("chooseItems: " + chooseItems.items);
  };

  return (
    <Grid container>
      <Box sx={{ width: "100%", typography: "body1", position: "absolute" }}>
        <TabContext value={choosenCategory}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={chooseCategory}
              aria-label="lab API tabs example"
            >
              {categories.map((category) => (
                <Tab value={category.name} label={category.name} />
              ))}
            </TabList>
          </Box>
        </TabContext>
      </Box>
      <Grid xs={14}>
        <div>
          <DrawerCart
            nbItems={countItems}
            items={chooseItems}
            total={totalPrice}
            tableId={tableId}
            tabletNumber={tabletNumber}
          />
        </div>
        <Paper style={{ maxHeight: 700, overflow: "auto" }}>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            {choosenCategory}
          </h1>
          <h3>table Id : {tableId}</h3>
          <h3>tablet Number: {tabletNumber}</h3>

          <Box sx={{ flexGrow: 1, ml: 10 }}>
            <QuantityModal
              openModal={openModal}
              closeModal={() => setOpenModal(false)}
              item={selectedItem}
              name={modalItemName}
              confirm={(item, quantity) => addItemToCart(item, quantity)}
            />
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 20 }}
            >
              {menuItems.map((_, index) => (
                <Grid item xs={"auto"} sm={4} md={4} key={index}>
                  <div onClick={() => chooseItem(_)}>
                    <MenuItem
                      name={_.fullName}
                      image={_.image}
                      price={_.price}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
