// Import
const express = require("express");
const Route = express.Router();
const auth = require("../configs/auth");

// Import Controllers
const orderController = require("../controllers/orders");

Route.get("/order", auth.ensureToken, orderController.getOrders);
Route.post("/order", auth.ensureToken, orderController.addNewOrder);
Route.put("/order/:id", auth.ensureToken, orderController.editOrder);
Route.put("/order/checkout/:id", auth.ensureToken, orderController.updateStatusOrder);
Route.delete("/order/:id", auth.ensureToken, orderController.deleteOrder);

module.exports = Route;
