const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

module.exports = 
    mongoose.model('Transaction', new Schema({
        member: { type: Schema.ObjectId, ref: 'Customer' },
        days: Number,
        out_date: { type: Date, default: new Date() },
        due_date: Date,
        in_date: Date,
        fine: Number,
        booklist: [{ type: Schema.ObjectId, ref: 'Book' }]
    }).pre('save', function() {
        this.due_date = moment().add(this.days, 'd');
    }).pre('update', function() {
        let diff = +new Date(this._update.$set.in_date) - (+this._update.$set.due_date);
        let day_fine = new Date(diff) / 864e5;

        if (day_fine > 0) this._update.$set.fine = 1000 * Math.ceil(day_fine);
        else this._update.$set.fine = 0;
    })
);