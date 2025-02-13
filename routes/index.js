const express = require('express');
const router = express.Router();

const catwaysRouter = require('../routes/catways');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.use('/catways', catwaysRouter);

module.exports = router;
