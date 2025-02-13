const express = require('express');
const router = express.Router();

const userRouter = require('../routes/users')
const catwaysRouter = require('../routes/catways');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRouter);
router.use('/catways', catwaysRouter);

module.exports = router;
