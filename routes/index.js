const express = require('express');
const router = express.Router();

const { checkJWT } = require('../middlewares/private')

const userRouter = require('../routes/users')
const catwaysRouter = require('../routes/catways');
const {
  formCreateCatway,
  formUpdateCatway
} = require('../services/catways.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Russell Réservation' });
});

/* GET dashboard. */
router.get('/dashboard',checkJWT, function(req, res, next) {
  res.render('dashboard', { title: 'Tableau de bord' });
});

router.use('/users', userRouter);
router.use('/catways', catwaysRouter);

/* FORM CREATE Catway */
router.get('/create-catways',checkJWT, formCreateCatway);
/* FORM UPDATE Catway */
router.get('/update-catways/:id',checkJWT, formUpdateCatway);

module.exports = router;
