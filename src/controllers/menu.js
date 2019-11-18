// Import
const menuModel = require("../models/menu");
const schema = require("../configs/validation");

// Controllers
module.exports = {
  getMenu: (req, res) => {
    menuModel.getMenu
      .then(menu => {
        if (!menu.length) {
          res.status(404).json({
            status: 404,
            message: "There is no menu found!"
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Get all menu successfully!",
            data: menu
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: "Get menu failed!"
        });
      });
  },
  getMenuById: (req, res) => {
    const id = parseInt(req.params);

    menuModel
      .getMenuById(id)
      .then(menu => {
        if (!menu.length) {
          res.status(404).json({
            status: 404,
            message: "There is no menu with ID: " + id
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Get menu successfully!",
            data: menu
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: "Get menu failed!"
        });
      });
  },
  addNewMenu: (req, res) => {
    const menu = {
      menu_name: req.body,
      menu_description: req.body,
      menu_category: req.body,
      menu_price: req.body,
      menu_quantity: req.body,
      menu_added_by: req.body
    };

    const validation = schema.menu.validate(menu);

    if (validation.error) {
      res.status(400).json({
        status: 400,
        message: validation.error.details[0].message
      });
    } else {
      menuModel
        .addNewMenu(menu)
        .then(() => {
          res.status(200).json({
            status: 200,
            message: "New menu added successfully!",
            data: menu
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            status: 500,
            message: "Failed to add!"
          });
        });
    }
  },
  editMenu: (req, res) => {
    const id = parseInt(req.params);
    const menu = {
      menu_name: req.body,
      menu_description: req.body,
      menu_category: req.body,
      menu_price: req.body,
      menu_quantity: req.body,
      menu_added_by: req.body
    };

    const validation = schema.menu.validate(menu);

    if (validation.error) {
      res.status(400).json({
        status: 400,
        message: validation.error.details[0].message
      });
    } else {
      menuModel
        .editMenu(menu, id)
        .then(menu => {
          if (!menu.affectedRows) {
            res.status(404).json({
              status: 404,
              message: "There is no menu with ID: " + id
            });
          } else {
            res.status(200).json({
              status: 200,
              message: "Menu edited successfully!",
              data: menu
            });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            status: 500,
            message: "Failed to edit!"
          });
        });
    }
  },
  deleteMenu: (req, res) => {
    const id = parseInt(req.params);

    menuModel
      .deleteMenu(id)
      .then(menu => {
        if (!menu.affectedRows) {
          res.status(404).json({
            status: 404,
            message: "There is no menu with ID: " + id
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Delete menu successfully!",
            id: id
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: "Delete menu failed!"
        });
      });
  }
};
