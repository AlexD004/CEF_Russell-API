const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../services/users')

/* GET Catways. */
router.get('/', getUsers);
/* GET Catway Details. */
router.get('/:id', getUserById);
/* POST New Catway. */
router.post('/', createUser);
/* PUT to update Catway. */
router.put('/:id', updateUser);
/* DELETE Catway. */
router.delete('/:id', deleteUser);

module.exports = router;
