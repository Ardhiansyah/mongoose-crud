const Transaction = require('../models/transaction.model');
const Book = require('../models/book.model');

module.exports = {
    listTransaction(req, res) {
        Transaction.find((err, transaction) => {
            if (err) return res.status(500).json({ message: err });
            return res.status(200).json({
                message: "Transaction Found",
                transaction
            })
        })
        .populate('member')
        .populate('booklist')
    },

    addTransaction(req, res) {
        let newTransaction = new Transaction(req.body);
        newTransaction.save(err => {
            if (err) return res.status(500).json({ message: err });
            return res.status(200).json({
                message: "Transaction successfully created",
                transaction: newTransaction
            });
        })
    },

    editTransaction(req, res) {
        Transaction.findById(req.params.id, (err, transaction) => {
            if (err) return res.status(500).json({ message: err });
            transaction.in_date = new Date(req.body.in_date);
            Transaction.update({ _id: req.params.id }, { $set: transaction }, (err, result) => {
                if (err) return res.status(500).json({ message: err });
                return res.status(200).json({
                    message: "Transaction successfully updated"
                });
            })
        })
    },

    deleteTransaction(req, res) {
        Transaction.findByIdAndRemove(req.params.id, (err, transaction) => {
            if (err) return res.status(500).json({ message: err });
            return res.status(200).json({
                message: "Transaction successfully deleted",
                id: transaction._id
            });
        })
    }
};