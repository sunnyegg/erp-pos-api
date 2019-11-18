// Import
const express = require("express");
const Route = express.Router();
const auth = require("../configs/auth");

// Import Controllers
const menuController = require("../controllers/menu");

Route.get("/menu", auth.ensureToken, menuController.getMenu);
Route.get("/menu/:id", auth.ensureToken, menuController.getMenuById);
Route.post("/menu/add", auth.ensureToken, menuController.addNewMenu);
Route.put("/menu/edit/:id", auth.ensureToken, menuController.editMenu);
Route.delete("/menu/:id", auth.ensureToken, menuController.deleteMenu);

module.exports = Route;
