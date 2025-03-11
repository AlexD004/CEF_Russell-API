const express = require('express');
const router = express.Router();

const { checkJWT } = require('../middlewares/private')

const {
  getCatways,
  getCatwayById,
  createCatway,
  updateCatway,
  deleteCatway
} = require('../services/catways.js')

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