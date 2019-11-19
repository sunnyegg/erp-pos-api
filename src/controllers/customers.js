// Import
const customerModel = require("../models/customers");

// Controllers
module.exports = {
  getCustomers: (req, res) => {
    customerModel
      .getCustomers()
      .then(customer => {
        if (!customer.length) {
          res.status(404).json({
            status: 404,
            message: "There is no customer found!"
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Get all customers successfully!",
            data: customer
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: "Get customer failed!"
        });
      });
  },
  addCustomer: (req, res) => {
    const data = {
      customer_name: req.body.customer_name
    };

    customerModel
      .addCustomer(data)
      .then(() => {
        res.status(200).json({
          status: 200,
          message: "Customer added successfully!",
          data: data
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: "Add failed! "
        });
      });
  },
  editCustomer: (req, res) => {
    const id = parseInt(req.params.id);
    const data = {
      customer_name: req.body.customer_name
    };

    customerModel
      .editCustomer(data, id)
      .then(customer => {
        if (!customer.affectedRows) {
          res.status(404).json({
            status: 404,
            message: "There is no customer with ID: " + id
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Customer edited successfully!",
            data: data
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: "Edit failed!"
        });
      });
  },
  deleteCustomer: (req, res) => {
    const id = parseInt(req.params.id);

    customerModel
      .deleteCustomer(id)
      .then(customer => {
        if (!customer.affectedRows) {
          res.status(404).json({
            status: 404,
            message: "There is no customer with ID: " + id
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Customer deleted successfully!",
            id: id
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: "Delete failed!"
        });
      });
  }
};
