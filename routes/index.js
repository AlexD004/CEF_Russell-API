const express = require('express');
const router = express.Router();

const { checkJWT } = require('../middlewares/private')

const userRouter = require('../routes/users')
const catwaysRouter = require('../routes/catways');

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

module.exports = router;
