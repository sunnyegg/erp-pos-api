// Import
const conn = require("../configs/db");

// Models
module.exports = {
  getTransactions: () => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT transactions.transaction_id, customers.customer_name, orders.order_invoice, orders.order_table, menu.menu_name, orders.order_description, menu_category.category_name, menu.menu_price, orders.order_quantity, orders_status.status_name AS status, orders.order_menu_added, users.user_name AS added_by, orders.order_menu_updated, users.user_name AS updated_by FROM transactions INNER JOIN orders ON transactions.transaction_order_id = orders.order_id INNER JOIN customers ON orders.customer_id = customers.customer_id INNER JOIN menu ON orders.order_menu_id = menu.menu_id INNER JOIN menu_category ON menu.menu_category = menu_category.category_id INNER JOIN orders_status ON orders.order_menu_status = orders_status.status_id INNER JOIN users ON orders.order_added_by AND orders.order_updated_by = users.user_id",
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
  newTransaction: data => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO transactions SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  editTransaction: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE transactions SET ? WHERE transaction_id = ?",
        [data, id],
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
  deleteTransaction: id => {
    return new Promise((resolve, reject) => {
      conn.query("DELETE FROM transactions WHERE transaction_id = ?", id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  }
};
