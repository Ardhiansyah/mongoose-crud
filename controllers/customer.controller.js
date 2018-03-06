const Customer = require('../models/customer.model');

module.exports = {
    listCustomer(req, res) {
        Customer.find((err, customers) => {
            if (err) return res.status(500).json({ message: err });
            return res.status(200).json({
                message: "Customer Found",
                customers
            })
        })
    },

    addCustomer(req, res) {
        let newCustomer = new Customer(req.body);
        newCustomer.save(err => {
            if (err) return res.status(500).json({ message: err });
            return res.status(200).json({
                message: "Customer successfully created",
                customer: newCustomer
            });
        })
    },

    editCustomer(req, res) {
        Customer.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, customer) => {
            if (err) return res.status(500).json({ message: err });
            return res.status(200).json({
                message: "Customer successfully updated",
                customer
            });
        })
    },

    deleteCustomer(req, res) {
        Customer.findByIdAndRemove(req.params.id, (err, customer) => {
            if (err) return res.status(500).json({ message: err });
            return res.status(200).json({
                message: "Customer successfully deleted",
                id: customer._id
            });
        })
    }
};