// Import
const express = require("express");
const Route = express.Router();
const auth = require("../configs/auth");

// Import Controllers
const usersController = require("../controllers/users");

// Routes for Admin (not implemented yet)
Route.get("/user", auth.ensureToken, usersController.getUsers);
Route.put("/user/:id", auth.ensureToken, usersController.updateUser);
Route.delete("/user/:id", auth.ensureToken, usersController.deleteUser);

// Routes for Public
Route.post("/user/register", usersController.registerUser);
Route.post("/user/login", usersController.loginUser);

module.exports = Route;
