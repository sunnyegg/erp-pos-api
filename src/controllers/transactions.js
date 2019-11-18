// Import
const transactionModel = require("../models/transactions");

// Controllers
module.exports = {
  getTransactions: (req, res) => {
    transactionModel
      .getTransactions()
      .then(transactions => {
        if (!transactions.length) {
          res.status(200).json({
            status: 200,
            message: "There is no transaction!"
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Get all transactions successfully!",
            data: transactions
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: "Get transaction failed!"
        });
      });
  },
  newTransaction: (req, res) => {
    const data = {
      transaction_order_id: req.body
    };

    transactionModel
      .newTransaction(data)
      .then(() => {
        res.status(200).json({
          status: 200,
          message: "Transaction success!",
          data: data
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: "Transaction failed!"
        });
      });
  },
  editTransaction: (req, res) => {
    const id = parseInt(req.params);
    const data = {
      transaction_order_id: req.body
    };

    transactionModel
      .editTransaction(data, id)
      .then(transaction => {
        if (!transaction.affectedRows) {
          res.status(404).json({
            status: 404,
            message: "There is no transaction with ID: " + id
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Transaction edited successfully!",
            data: data
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: "Failed to edit!"
        });
      });
  },
  deleteTransaction: (req, res) => {
    const id = parseInt(req.params);

    transactionModel
      .deleteTransaction(id)
      .then(transaction => {
        if (!transaction.affectedRows) {
          res.status(404).json({
            status: 404,
            message: "There is no transaction with ID: " + id
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Transaction deleted successfully!",
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
