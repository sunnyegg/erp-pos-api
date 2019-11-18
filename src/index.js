// Import
const express = require("express");
const Route = express.Router();

// Define
const users = require("./routes/users");
const customers = require("./routes/customers");
const accounts = require("./routes/accounts");
const transactions = require("./routes/transactions");

// Routes
Route.use("/api", users);
Route.use("/api", customers);
Route.use("/api", accounts);
Route.use("/api", transactions);

module.exports = Route;
