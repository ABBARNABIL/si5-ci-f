import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import OrderScreen from "./screens/OrderScreen";
import OrderListScreen from "./screens/OrderListScreen";
import HomeScreen from "./screens/HomeScreen";
import * as serviceWorker from "./serviceWorker";
import ConfirmOrderScreen from "./screens/ConfirmOrderScreen";
import InvoiceScreen from "./screens/InvoiceScreen";
import KitchenOrderListScreen from "./screens/KitchenOrderListScreen";
import TableScreen from "./screens/v2-app/TableScreen";
import TabletteOrderScreen from "./screens/TabletteOrderScreen";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />{" "}
        <Route exact path="/order" element={<OrderScreen />} />{" "}
        <Route exact path="/order/confirm" element={<ConfirmOrderScreen />} />{" "}
        <Route exact path="/dining-order-list" element={<OrderListScreen />} />{" "}
        <Route exact path="/" element={<HomeScreen />} />
        <Route exact path="/order" element={<OrderScreen />} />
        <Route exact path="/order/confirm" element={<ConfirmOrderScreen />} />
        <Route exact path="/dining-order-list" element={<OrderListScreen />} />
        <Route
          exact
          path="/kitchen-order-list"
          element={<KitchenOrderListScreen />}
        />{" "}
        <Route exact path="/invoice" element={<InvoiceScreen />} />{" "}
        <Route exact path="/table" element={<TableScreen />} />{" "}
        <Route exact path="/tablette-order" element={<TabletteOrderScreen />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
