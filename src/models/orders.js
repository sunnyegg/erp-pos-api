// Import
const conn = require("../configs/db");

// Models
module.exports = {
  getOrders: () => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT orders.order_id, orders.order_invoice, orders.order_table, menu.menu_name, menu_category.category_name, menu.menu_price, orders.order_quantity, order_menu_added, orders_status.status_name FROM orders INNER JOIN menu ON orders.order_menu_id = menu.menu_id INNER JOIN menu_category ON menu.menu_category = menu_category.category_id INNER JOIN orders_status ON orders.order_menu_status = orders_status.status_id",
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
  addNewOrder: data => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO orders SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  editOrder: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query("UPDATE orders SET ? WHERE order_id = ?", [data, id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateStatusOrder: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT user_id, user_type FROM users WHERE user_id = ?",
        data.order_updated_by,
        (err, result) => {
          if (result[0].user_type !== 1) {
            reject("You are not allowed to do that.");
          } else {
            if (!err) {
              conn.query("UPDATE orders SET ? WHERE order_id = ?", [data, id], (err, result) => {
                if (!err) {
                  resolve(result);
                } else {
                  reject(new Error(err));
                }
              });
            } else {
              reject(err);
            }
          }
        }
      );
    });
  },
  deleteOrder: id => {
    return new Promise((resolve, reject) => {
      conn.query("DELETE FROM orders WHERE order_id = ?", id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  }
};
