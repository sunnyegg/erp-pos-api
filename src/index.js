// Import
const express = require("express");
const Route = express.Router();

// Define
const users = require("./routes/users");
const customers = require("./routes/customers");
const menu = require("./routes/menu");
const transactions = require("./routes/transactions");

// Routes
Route.use("/api", users);
Route.use("/api", customers);
Route.use("/api", menu);
Route.use("/api", transactions);

module.exports = Route;
