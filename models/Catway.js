const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Catway = new Schema({
    catwayNumber: Number,
    type: String,
    catwayState: String
});

module.exports = mongoose.model('Catway', Catway) ;