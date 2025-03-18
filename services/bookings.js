const Catway = require('../models/Catway.js')
const Booking = require('../models/Booking.js')

/* GET Bookings. */
exports.getBookings = async (req, res, next) => {
    const id = parseInt(req.params.id);
  try {
    let catway = await Catway.find({catwayNumber : id});
    let catwayNumber = catway[0].catwayNumber;
    let bookings = await Booking.find({catwayNumber: id});
    if (bookings) {
      return res.status(200).render('bookings', { title: 'Liste des réservations pour le Catway N°'+id, bookings: bookings, catwayNumber: catwayNumber});
    }

    return res.status(404).json('Bookings not found');

  } catch (error) {
    return res.status(501).json(error);
  }
}

/* GET Booking Details. */ '/:id/reservations/:idReservation'
exports.getBookingById = async (req, res, next) => {
  const id = req.params.idReservation;
  const catwayNumber = req.params.id;
  
  try {
    let booking = await Booking.findOne({bookId : id});

    if (booking) {
      return res.status(200).render('booking', { title: 'Réservation N°'+id, booking: booking, catwayNumber: catwayNumber});
    }

    return res.status(404).json('Booking not found');

  } catch (error) {
    return res.status(501).json(error);
  }
}

/* POST New Booking. */
exports.createBooking = async (req, res, next) => { 

    const id = parseInt(req.params.id);

    let bookings = await Booking.find();

    let bookIDArray = [];
    for (i=0;i < bookings.length; i++) {
      bookIDArray.push(bookings[i].bookId);
    }
    let maxID = Math.max(...bookIDArray);
    const newBookID = maxID + 1;

    const checkIn = req.body.checkIn;
    const dateCheckIn = new Date(checkIn);
    const checkOut = req.body.checkOut;
    const dateCheckOut = new Date(checkOut);

    const temp = ({
        bookId: newBookID,
        catwayNumber: id,
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        checkIn: dateCheckIn,
        checkOut: dateCheckOut
    });

  try {
    await Booking.create(temp);
    return res.status(201).json({status : 201, newBookId : newBookID});

  } catch (error) {
    return res.status(501).json(error);
  }
};

/* DELETE Booking. */
exports.deleteBooking = async (req, res, next)  => {
  const id = req.params.idReservation
  try {
    await Booking.deleteOne({bookId: id});

    return res.sendStatus(200);

  } catch (error) {
    return res.status(501).json(error);
  }
};

/* GET => FORM CREATE Boooking */
exports.formCreateBooking = (req, res, next)  => {
    const id = req.params.id;
    try {
      res.render('formCreateBooking', { title: 'Enregistrer une réservation', id: id });
    } catch (error) {
      return res.status(501).json(error);
    }
  };