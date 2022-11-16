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
import PreparingScreen from "./screens/v2-app/PreparingScreen";
import TabletteOrderScreen from "./screens/v2-app/TabletteOrderScreen";
import GameScreen from "./screens/v2-app/GameScreen";
import GamePlayScreen from "./screens/v2-app/GamePlayScreen";
import WaiterScreen from "./screens/v2-app/WaiterScreen";

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
        <Route exact path="/table/:tableId" element={<TableScreen />} />{" "}
        <Route exact path="/tablette-order" element={<TabletteOrderScreen />} />
        <Route exact path="/orders-preparing" element={<PreparingScreen />} />
        <Route exact path="/invoice" element={<InvoiceScreen />} />
        <Route exact path="/game-list" element={<GameScreen />} />
        <Route exact path="/gameplay" element={<GamePlayScreen />} />
        <Route
          exact
          path="/tablette-order/:tableId/:tabletNumber"
          element={<TabletteOrderScreen />}
        />
        <Route
          exact
          path="/waiter"
          element={<WaiterScreen />}
        />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
