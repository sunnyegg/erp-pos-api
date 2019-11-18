// Import
const express = require("express");
const Route = express.Router();
const auth = require("../configs/auth");

// Import Controllers
const transactionsController = require("../controllers/transactions");

// Routes for Admin (not implemented yet)
Route.get("/transaction", auth.ensureToken, transactionsController.getTransactions);

// Routes for Customer
Route.get("/transaction/:id", auth.ensureToken, transactionsController.getTransactionsById);
Route.post("/transaction/deposit", auth.ensureToken, transactionsController.depositTransaction);
Route.post("/transaction/withdraw", auth.ensureToken, transactionsController.withdrawTransaction);

module.exports = Route;
