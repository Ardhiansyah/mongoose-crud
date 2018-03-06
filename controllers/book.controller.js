const Book = require('../models/book.model');

module.exports = {
    listBook(req, res) {
        Book.find((err, books) => {
            if (err) return res.status(500).json({ message: err });
            return res.status(200).json({
                message: "Book Found",
                books
            })
        })
    },

    addBook(req, res) {
        let newBook = new Book(req.body);
        newBook.save(err => {
            if (err) return res.status(500).json({ message: err });
            return res.status(200).json({
                message: "Book successfully created",
                book: newBook
            });
        })
    },

    editBook(req, res) {
        Book.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, book) => {
            if (err) return res.status(500).json({ message: err });
            return res.status(200).json({
                message: "Book successfully updated",
                book
            });
        })
    },

    deleteBook(req, res) {
        Book.findByIdAndRemove(req.params.id, (err, book) => {
            if (err) return res.status(500).json({ message: err });
            return res.status(200).json({
                message: "Book successfully deleted",
                id: book._id
            });
        })
    }
};