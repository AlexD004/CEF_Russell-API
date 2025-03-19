const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Catway = new Schema({
    catwayNumber:{
        type        : Number,
        required    : [true, 'Numéro du catway manquant']
    },
    type: {
        type        : String
    },
    catwayState: {
        type        : String
    }
});

module.exports = mongoose.model('Catway', Catway) ;