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

/* ROUTES FOR BOOKING */

/* GET Bookings. */
router.get('/reservations', checkJWT, getBookings);
/* GET Bookings list by catway. */
router.get('/:id/reservations', checkJWT, getBookingsByCatway);
/* GET Booking details by ID. */
router.get('/:id/reservations/:idReservation', checkJWT, getBookingById);
/* POST New Booking. */
router.post('/:id/reservations', checkJWT, createBooking);
/* DELETE Booking. */
router.delete('/:id/reservations/:idReservation', checkJWT, deleteBooking);

module.exports = router;