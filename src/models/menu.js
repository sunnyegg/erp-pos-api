// Import
const conn = require("../configs/db");

// Models
module.exports = {
  getMenu: search => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT menu.menu_id, menu.menu_name, menu.menu_description, menu_category.category_name AS menu_category, menu.menu_price, menu.menu_quantity, menu_status.status_name AS status, menu.menu_date_added, users.user_name AS added_by, menu.menu_date_updated, users.user_name AS updated_by FROM menu INNER JOIN menu_category ON menu.menu_category = menu_category.category_id INNER JOIN menu_status ON menu.menu_status = menu_status.status_id INNER JOIN users ON menu.menu_added_by = users.user_id AND menu.menu_updated_by = users.user_id WHERE menu.menu_name LIKE ?",
        search,
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
        "SELECT menu.menu_id, menu.menu_name, menu.menu_description, menu_category.category_name, menu.menu_price, menu.menu_quantity, menu_status.status_name FROM menu INNER JOIN menu_category ON menu.menu_category = menu_category.category_id INNER JOIN menu_status ON menu.menu_status = menu_status.status_id WHERE menu.menu_id = ?",
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
          conn.query("UPDATE menu SET menu_status = 2 WHERE menu_id = ?", result.insertId);
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
          conn.query("UPDATE menu SET menu_date_updated = CURRENT_TIMESTAMP WHERE menu_id = ?", id);
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
