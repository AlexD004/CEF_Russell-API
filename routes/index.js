const express = require('express');
const router = express.Router();
const catways = require('../catways.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Catways. */
router.get('/catways', function(req, res, next) {
  const catwayState = catways.map(catways => {
    return { Etat: catways.catwayState } 
  })
  res.json(catwayState) 
});

/* GET Catway Details. */
router.get('/catways/:catwayID', function(req, res, next) {
  const id = Number(req.params.catwayID)
  const catway = catways.find(catway => catway.catwayNumber === id)
  res.json(catway)
});

module.exports = router;
