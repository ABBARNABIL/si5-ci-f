import axios from "axios";

export default class BffService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:8080/bff",
    });
  }

  getTAbles = async () => await this.api.get("/tables");

  getCategories = async () => await this.api.get("/menu/categories");

  getMenusByCategory = async (category) =>
    await this.api.get("/menu/" + category);

  createOrder = async (order) => await this.api.post("/orders", order);

  getOrders = async () => await this.api.get("/orders");

  createOrderTablette = async (tabletteOrder) =>
    await this.api.post("/tablet-orders", tabletteOrder);

  getTableOrders = async (tableId) => await this.api.get("/orders/"+tableId);

  validateTableOrders = async (tableId) => await this.api.post("/orders/"+tableId);

  getOrdersStatusByCategory = async () => await this.api.get("/orders/status-by-category");

  finishTableCategory = async (tableId, category) => await this.api.put("/preparation/"+tableId+"/"+category)

  }

