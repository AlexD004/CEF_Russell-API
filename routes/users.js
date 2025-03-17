const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  authenticate,
  formCreateUser,
  formUpdateUser
} = require('../services/users')

const { checkJWT } = require('../middlewares/private')


/* FORM CREATE User */
router.get('/create-users',checkJWT, formCreateUser);
/* FORM UPDATE User */
router.get('/update-user/:id',checkJWT, formUpdateUser);

/* GET Users. */
router.get('/', checkJWT, getUsers);
/* GET User Details. */
router.get('/:id', checkJWT, getUserById);
/* POST New User. */
router.post('/', checkJWT, createUser);
/* PUT to update User. */
router.put('/:id', checkJWT, updateUser);
/* DELETE User. */
router.delete('/:id', checkJWT, deleteUser);

/* AUTHENTICATE */
router.post('/authenticate', authenticate)

module.exports = router;
