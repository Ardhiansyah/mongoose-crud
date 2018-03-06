const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = 
    mongoose.model('Customer', new Schema({
        name: String,
        name: String,
        memberid: String,
        address: String,
        zipcode: String,
        phone: String
    }));