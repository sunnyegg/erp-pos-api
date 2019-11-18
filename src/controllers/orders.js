// Import
const orderModel = require("../models/orders");

// Controllers
module.exports = {
  getOrders: (req, res) => {
    orderModel.getOrders
      .then(orders => {
        if (!orders.length) {
          res.status(404).json({
            status: 404,
            message: "There is no order found!"
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Get all orders successfully!",
            data: orders
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: "Get order failed!"
        });
      });
  },
  addNewOrder: (req, res) => {
    const order = {
      order_table: req.body,
      order_menu_id: req.body,
      order_quantity: req.body,
      order_added_by: req.body
    };

    orderModel
      .addNewOrder(order)
      .then(() => {
        res.status(200).json({
          status: 200,
          message: "Order added successfully!",
          data: order
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: "Order failed!"
        });
      });
  },
  editOrder: (req, res) => {
    const id = parseInt(req.params);
    const edit = {
      order_table: req.body,
      order_menu_id: req.body,
      order_quantity: req.body,
      order_added_by: req.body
    };

    orderModel
      .editOrder(edit, id)
      .then(order => {
        if (!order.affectedRows) {
          res.status(404).json({
            status: 404,
            message: "There is no order with ID: " + id
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Order edited successfully!",
            data: edit
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
  updateStatusOrder: (req, res) => {
    const id = parseInt(req.params);
    const update = {
      order_menu_status: req.body,
      order_updated_by: req.body
    };

    orderModel
      .updateOrder(update, id)
      .then(order => {
        if (!order.affectedRows) {
          res.status(404).json({
            status: 404,
            message: "There is no order with ID: " + id
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Order updated successfully!",
            data: update
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: "Update failed!"
        });
      });
  },
  deleteOrder: (req, res) => {
    const id = parseInt(req.params);

    orderModel
      .deleteOrder(id)
      .then(order => {
        if (!order.affectedRows) {
          res.status(404).json({
            status: 404,
            message: "There is no order with ID: " + id
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Delete order successfully!",
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
