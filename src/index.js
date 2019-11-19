// Import
const express = require("express");
const Route = express.Router();

// Define
const users = require("./routes/users");
const orders = require("./routes/orders");
const menu = require("./routes/menu");
const transactions = require("./routes/transactions");
const customers = require("./routes/customers");

// Routes
Route.use("/api", users);
Route.use("/api", orders);
Route.use("/api", menu);
Route.use("/api", transactions);
Route.use("/api", customers);

module.exports = Route;
