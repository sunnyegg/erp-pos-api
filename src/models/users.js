// Import
const conn = require("../configs/db");

// Models
module.exports = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT users.user_id, users.user_name, users.user_type, users_type.type_name, users.user_created, users.user_login, users_status.status_name AS status FROM users INNER JOIN users_status ON users.user_status = users_status.status_id INNER JOIN users_type ON users.user_type = users_type.type_id",
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
  registerUser: data => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO users SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  loginUser: data => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT user_id, user_type, user_name, user_password FROM users WHERE user_name = ?",
        data,
        (err, result) => {
          if (!err) {
            conn.query(
              "UPDATE users SET user_login = CURRENT_TIMESTAMP, user_status = 2 WHERE user_name = ?",
              data
            );
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  logoutUser: id => {
    return new Promise((resolve, reject) => {
      conn.query("UPDATE users SET user_status = 2 WHERE user_id = ?", id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateUser: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query("UPDATE users SET ? WHERE user_id = ?", [data, id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deleteUser: id => {
    return new Promise((resolve, reject) => {
      conn.query("DELETE FROM users WHERE user_id = ?", id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  }
};
