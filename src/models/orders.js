// Import
const conn = require("../configs/db");

// Models
module.exports = {
  getOrders: () => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT orders.order_id, customers.customer_name, orders.order_invoice, orders.order_table, menu.menu_name, menu_category.category_name, menu.menu_price, orders.order_description, orders.order_quantity, order_menu_added, orders_status.status_name AS status FROM orders INNER JOIN menu ON orders.order_menu_id = menu.menu_id INNER JOIN menu_category ON menu.menu_category = menu_category.category_id INNER JOIN orders_status ON orders.order_menu_status = orders_status.status_id INNER JOIN customers ON orders.customer_id = customers.customer_id",
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
          conn.query(
            "SELECT menu_quantity FROM menu WHERE menu_id = ?",
            data.order_menu_id,
            (err, update) => {
              const countQuantity = update[0].menu_quantity - data.order_quantity;

              if (countQuantity < 1) {
                reject("Quantity cannot below 0");
              } else {
                const date = new Date();
                const format =
                  "ERP" +
                  date.getDate().toString() +
                  date.getMonth() +
                  date.getFullYear() +
                  "-" +
                  data.customer_id;

                conn.query(
                  `UPDATE orders SET order_invoice = '${format}' WHERE order_id = ${result.insertId}`
                );
                resolve(result);
              }
              if (err) {
                reject(err);
              }
            }
          );
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
          conn.query(
            "SELECT menu_quantity FROM menu WHERE menu_id = ?",
            data.order_menu_id,
            (err, update) => {
              const countQuantity = update[0].menu_quantity - data.order_quantity;

              if (countQuantity < 1) {
                reject("Quantity cannot below 0");
              } else {
                const date = new Date();
                const format =
                  "ERP" +
                  date.getDate().toString() +
                  date.getMonth() +
                  date.getFullYear() +
                  "-" +
                  data.customer_id;

                conn.query(`UPDATE orders SET order_invoice = '${format}' WHERE order_id = ${id}`);
                resolve(result);
              }
              if (err) {
                reject(err);
              }
            }
          );
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
        (err, user) => {
          if (!user.length) {
            reject("There is no user with ID: " + data.order_updated_by);
          } else {
            if (user[0].user_type !== 1) {
              reject("You are not allowed to do that.");
            } else {
              if (!err) {
                conn.query(
                  "SELECT order_menu_id, order_quantity FROM orders WHERE order_id = ?",
                  id,
                  (err, order) => {
                    if (!err) {
                      conn.query(
                        "SELECT menu_quantity FROM menu WHERE menu_id = ?",
                        order[0].order_menu_id,
                        (err, quantity) => {
                          const countQuantity = quantity[0].menu_quantity - order[0].order_quantity;

                          if (countQuantity < 1) {
                            conn.query(
                              "UPDATE menu SET menu_status = 1 WHERE menu_id = ?",
                              order[0].order_menu_id
                            );
                          }

                          if (!err) {
                            conn.query("UPDATE menu SET menu_quantity = ? WHERE menu_id = ?", [
                              countQuantity,
                              order[0].order_menu_id
                            ]);

                            conn.query(
                              "UPDATE orders SET ? WHERE order_id = ?",
                              [data, id],
                              (err, result) => {
                                if (!err) {
                                  resolve(result);
                                } else {
                                  reject(new Error(err));
                                }
                              }
                            );
                          } else {
                            reject(err);
                          }
                        }
                      );
                    } else {
                      reject(err);
                    }
                  }
                );
              } else {
                reject(err);
              }
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
