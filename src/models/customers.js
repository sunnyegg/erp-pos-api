// Import
const conn = require("../configs/db");

// Models
module.exports = {
  getCustomers: () => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * FROM customers", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  addCustomer: data => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO customers SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  editCustomer: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query("UPDATE customers SET ? WHERE customer_id = ?", [data, id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deleteCustomer: id => {
    return new Promise((resolve, reject) => {
      conn.query("DELETE FROM customers WHERE customer_id = ?", id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  }
};
