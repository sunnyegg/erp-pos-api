// Import
const express = require("express");
const Route = express.Router();
const auth = require("../configs/auth");

// Import Controllers
const transactionsController = require("../controllers/transactions");

Route.get("/transaction", auth.ensureToken, transactionsController.getTransactions);
Route.post("/transaction", auth.ensureToken, transactionsController.newTransaction);
Route.put("/transaction/:id", auth.ensureToken, transactionsController.editTransaction);
Route.delete("/transaction/:id", auth.ensureToken, transactionsController.deleteTransaction);

module.exports = Route;
