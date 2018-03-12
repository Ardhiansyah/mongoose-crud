const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const Book = require('./book.model');

module.exports = 
    mongoose.model('Transaction', new Schema({
        member: { type: Schema.ObjectId, ref: 'Customer' },
        days: Number,
        out_date: { type: Date, default: new Date() },
        due_date: Date,
        in_date: Date,
        fine: Number,
        booklist: [{ type: Schema.ObjectId, ref: 'Book' }]
    }).pre('save', function(next) {
        this.due_date = moment().add(this.days, 'd');
        Book.find({ '_id': { $in: this.booklist }}, (err, books) => {
            let flag = true;
            for (let i = 0; i < books.length; i++) {
                if (books[i].stock == 0) {
                    flag = false;
                    break;
                }
            }

            if (!flag) return next(new Error('Stock Habis'));
            
            books.forEach(book => {
                book.stock--;

                book.save(err => {
                    if (err) return next(new Error(err));
                });
            });

            return next();
        });        
    }).pre('update', function(next) {
        let diff = +new Date(this._update.$set.in_date) - (+this._update.$set.due_date);
        let day_fine = new Date(diff) / 864e5;

        if (day_fine > 0) this._update.$set.fine = 1000 * Math.ceil(day_fine);
        else this._update.$set.fine = 0;

        Book.find({ '_id': { $in: this._update.$set.booklist }}, (err, books) => {    
            books.forEach(book => {
                book.stock++;
                book.save(err => {
                    if (err) return next(new Error(err));
                });
            });
            return next();
        })
    })
);