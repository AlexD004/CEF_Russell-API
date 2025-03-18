const express = require('express');
const router = express.Router();

const { checkJWT } = require('../middlewares/private')

const {
  getCatways,
  getCatwayById,
  createCatway,
  updateCatway,
  deleteCatway,
  formCreateCatway,
  formUpdateCatway
} = require('../services/catways.js')

const {
  getBookings,
  getBookingById,
  createBooking,
  deleteBooking,
  formCreateBooking
} = require('../services/bookings.js')

/* ROUTES FOR BOOKING */

/* FORM CREATE Booking */
router.get('/:id/create-reservation',checkJWT, formCreateBooking);

/* GET Bookings list by catway. */
router.get('/:id/reservations', checkJWT, getBookings);
/* GET Booking details by ID. */
router.get('/:id/reservations/:idReservation', checkJWT, getBookingById);
/* POST New Booking. */
router.post('/:id/reservations', checkJWT, createBooking);
/* DELETE Booking. */
router.delete('/:id/reservations/:idReservation', checkJWT, deleteBooking);

/* ----- */

/* FORM CREATE Catway */
router.get('/create-catways',checkJWT, formCreateCatway);
/* FORM UPDATE Catway */
router.get('/update-catways/:id',checkJWT, formUpdateCatway);

/* GET Catways. */
router.get('/', checkJWT, getCatways);
/* GET Catway Details. */
router.get('/:id', checkJWT, getCatwayById); 
/* POST New Catway. */
router.post('/', checkJWT, createCatway);
/* PUT to update Catway. */
router.put('/:id', checkJWT, updateCatway);
/* DELETE Catway. */
router.delete('/:id', checkJWT, deleteCatway);

module.exports = router;