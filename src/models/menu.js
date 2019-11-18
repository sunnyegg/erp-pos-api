// Import
const conn = require("../configs/db");

// Models
module.exports = {
  getMenu: () => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT menu.menu_id, menu.menu_name, menu.menu_description, menu_category.category_name, menu.menu_price, menu.menu_quantity, menu.menu_date_added, menu.menu_date_updated FROM menu INNER JOIN menu_category ON menu.menu_category = menu_category.category_id",
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getMenuById: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT menu.menu_id, menu.menu_name, menu.menu_description, menu_category.category_name, menu.menu_price, menu.menu_quantity FROM menu INNER JOIN menu_category ON menu.menu_category = menu_category.category_id WHERE menu.menu_id = ?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  addNewMenu: data => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO menu SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  editMenu: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query("UPDATE menu SET ? WHERE menu_id = ?", [data, id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deleteMenu: id => {
    return new Promise((resolve, reject) => {
      conn.query("DELETE FROM menu WHERE menu_id = ?", id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  }
};
