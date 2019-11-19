// Import
const express = require("express");
const Route = express.Router();
const auth = require("../configs/auth");

// Import Controllers
const customerController = require("../controllers/customers");

Route.get("/customer", auth.ensureToken, customerController.getCustomers);
Route.post("/customer", auth.ensureToken, customerController.addCustomer);
Route.put("/customer/:id", auth.ensureToken, customerController.editCustomer);
Route.delete("/customer/:id", auth.ensureToken, customerController.deleteCustomer);

module.exports = Route;
