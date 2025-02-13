const express = require('express');
const router = express.Router();

const {
  getCatways,
  getCatwayById,
  createCatway,
  updateCatway,
  deleteCatway
} = require('../services/catways.js')

/* GET Catways. */
router.get('/', getCatways);
/* GET Catway Details. */
router.get('/:id', getCatwayById);
/* POST New Catway. */
router.post('/', createCatway);
/* PUT to update Catway. */
router.put('/:id', updateCatway);
/* DELETE Catway. */
router.delete('/:id', deleteCatway);

module.exports = router;
