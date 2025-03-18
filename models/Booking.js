const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Booking = new Schema({
    bookId: {
        type        : Number
    },
    catwayNumber: {
        type        : Number
    },
    clientName: {
        type        : String,
        trim        : true,
        required    : [true, 'Le nom du client est requis']
    },
    boatName: {
        type        : String,
        trim        : true,
        required    : [true, 'Le nom du bateau est requis']
    },
    checkIn: {
        type        : Date,
        required    : [true, 'La date de début de réservation est requise']
    },
    checkOut: {
        type        : Date,
        required    : [true, 'La date de fin de réservation est requise']
    }
}, {
    timestamps      : true
});

module.exports = mongoose.model('Booking', Booking) ;