const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  authenticate
} = require('../services/users')

/* GET Users. */
router.get('/', getUsers);
/* GET User Details. */
router.get('/:id', getUserById);
/* POST New User. */
router.post('/', createUser);
/* PUT to update User. */
router.put('/:id', updateUser);
/* DELETE User. */
router.delete('/:id', deleteUser);

/* AUTHENTICATE */
router.post('/authenticate', authenticate)

module.exports = router;
