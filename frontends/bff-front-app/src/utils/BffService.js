import axios from "axios";

export default class BffService {
    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:8080/bff"
        });
    }

    getTAbles = async () => await this.api.get("/tables");

    getCategories = async () => await this.api.get("/menu/categories");

    getMenusByCategory = async (category) => await this.api.get("/menu/" + category)

    createOrder = async (order) => await this.api.post("/orders", order);

    getOrders = async () => await this.api.get("/orders");
}

