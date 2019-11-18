// Import
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const schema = require("../configs/validation");

// Controllers
module.exports = {
  getUsers: (req, res) => {
    userModel
      .getUsers()
      .then(users => {
        if (!users.length) {
          res.status(404).json({
            status: 404,
            message: "There is no user!"
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Get all users successfully!",
            data: users
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: "Get users failed!"
        });
      });
  },
  registerUser: (req, res) => {
    const register = {
      user_name: req.body.user_name,
      user_password: req.body.user_password,
      user_type: req.body.user_type
    };

    const validation = schema.user_register.validate(register);

    if (validation.error) {
      res.status(400).json({
        status: 400,
        message: validation.error.details[0].message
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      bcrypt.hashSync(register.user_password, salt);

      bcrypt.genSalt(10, () => {
        bcrypt.hash(register.user_password, salt, (err, hash) => {
          if (err) throw err;
          register.user_password = hash;

          userModel
            .registerUser(register)
            .then(() => {
              res.json({
                status: 200,
                message: "User is registered successfully!",
                username: register.user_name
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                status: 500,
                message: "Register failed."
              });
            });
        });
      });
    }
  },
  loginUser: (req, res) => {
    const login = {
      user_name: req.body.user_name,
      user_password: req.body.user_password
    };

    const validation = schema.user_login.validate(login);

    if (validation.error) {
      res.status(400).json({
        status: 400,
        message: validation.error.details[0].message
      });
    } else {
      userModel
        .loginUser(login.user_name)
        .then(user => {
          if (!user.length) {
            res.status(404).json({
              status: 404,
              message: "Username not found!"
            });
          } else {
            const passwordCheck = bcrypt.compareSync(login.user_password, user[0].user_password);
            if (!passwordCheck) {
              res.status(400).json({
                status: 400,
                message: "Password is incorrect"
              });
            } else {
              jwt.sign(
                { username: login.user_name },
                process.env.SECRET_KEY,
                { expiresIn: "30m" },
                (err, token) => {
                  res.status(200).json({
                    status: 200,
                    message: "Login successful!",
                    id: user[0].user_id,
                    user_type: user[0].user_type,
                    username: user[0].user_name,
                    token: token
                  });
                }
              );
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  updateUser: (req, res) => {
    const id = parseInt(req.params.id);
    const update = {
      user_name: req.body.user_name,
      user_password: req.body.user_password
    };

    const validation = schema.user_login.validate(update);

    if (validation.error) {
      res.status(400).json({
        status: 400,
        message: validation.error.details[0].message
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      bcrypt.hashSync(update.user_password, salt);

      bcrypt.genSalt(10, () => {
        bcrypt.hash(update.user_password, salt, (err, hash) => {
          if (err) throw err;
          update.user_password = hash;

          userModel
            .updateUser(update, id)
            .then(user => {
              if (!user.affectedRows) {
                res.status(404).json({
                  status: 404,
                  message: "There is no user with ID: " + id
                });
              } else {
                res.status(200).json({
                  status: 200,
                  message: "User is updated successfully!",
                  username: update.user_name
                });
              }
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                status: 500,
                message: "Update failed."
              });
            });
        });
      });
    }
  },
  deleteUser: (req, res) => {
    const id = parseInt(req.params.id);

    userModel
      .deleteUser(id)
      .then(user => {
        if (!user.affectedRows) {
          res.status(404).json({
            status: 404,
            message: "There is no user with ID: " + id
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Delete user successfully!",
            id: id
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.json({
          status: 500,
          message: "Delete failed!"
        });
      });
  }
};
