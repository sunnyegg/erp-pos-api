// Import
const orderModel = require("../models/orders");
const schema = require("../configs/validation");

// Controllers
module.exports = {
  getOrders: (req, res) => {
    orderModel
      .getOrders()
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
            total: orders.length,
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
      order_table: req.body.order_table,
      order_menu_id: req.body.order_menu_id,
      order_description: req.body.order_description,
      order_quantity: req.body.order_quantity,
      order_added_by: req.body.order_added_by,
      customer_id: req.body.customer_id
    };

    const validation = schema.order_add.validate(order);

    if (validation.error) {
      res.status(400).json({
        status: 400,
        message: validation.error.details[0].message
      });
    } else {
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
            message: "Order failed! " + err
          });
        });
    }
  },
  editOrder: (req, res) => {
    const id = parseInt(req.params.id);
    const edit = {
      order_table: req.body.order_table,
      order_menu_id: req.body.order_menu_id,
      order_description: req.body.order_description,
      order_quantity: req.body.order_quantity,
      customer_id: req.body.customer_id
    };

    const validation = schema.order_edit.validate(edit);

    if (validation.error) {
      res.status(400).json({
        status: 400,
        message: validation.error.details[0].message
      });
    } else {
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
    }
  },
  updateStatusOrder: (req, res) => {
    const id = parseInt(req.params.id);
    const update = {
      order_menu_status: req.body.order_menu_status,
      order_updated_by: req.body.order_updated_by
    };

    orderModel
      .updateStatusOrder(update, id)
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
          message: "Update failed! " + err
        });
      });
  },
  deleteOrder: (req, res) => {
    const id = parseInt(req.params.id);

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
