const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @param {*} req nothing particular
 * @returns {number} Status Code (if 200, redirect user)
 */
exports.getUsers = async (req, res, next) => {

  try {
    let users = await User.find();

    if (users) {
      return res.status(200).render('users', { title: 'Liste des utilisateurs', users: users});
    }

    return res.status(404).json('Users not found');

  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @typedef {object} req
 * @property {number} id 'userID' of clicked user
 * 
 * @param {req} req request with userID as 'id'
 * @returns {number} Status Code (if 200, redirect user)
 */
exports.getUserById = async (req, res, next) => {
  const id = req.params.id
  
  try {
    let user = await User.findOne({userID : id});

    if (user) {
      return res.status(200).render('user', { title: user.name, user: user});
    }

    return res.status(404).json('User not found');

  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * 
 * @param {req} req request with FormData in body
 * @returns {obect} {status code , userID of the new user}
 */
exports.createUser = async (req, res, next) => { 
  let users = await User.find();

  let usersIDArray = [];
  for (i=0;i < users.length; i++) {
    usersIDArray.push(users[i].userID);
  }
  let maxID = Math.max(...usersIDArray);
  const newUserID = maxID + 1;

  const temp = ({
    userID      : newUserID,
    name    : req.body.name,
    email   : req.body.email,
    password: req.body.password
  });

  try {
    await User.create(temp);

    return res.status(201).json({status : 201, userID : newUserID});

  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * @typedef {object} req
 * @property {number} id 'userID' of clicked user
 * 
 * @param {req} req request : userID as 'id' / FormData in body
 * @returns {number} Status Code
 */
exports.updateUser = async (req, res, next) => {
  const id = req.params.id
  const temp = ({
    userID      : req.body.userID,
    name    : req.body.name,
    email   : req.body.email
  });

  try {
    let user = await User.findOne({userID : id});

    if (user) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          user[key] = temp[key]
        }
      });

      await user.save();
      return res.status(201).json(user);
    }

    return res.status(404).json('User not found');

  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * @typedef {object} req
 * @property {number} id 'userID' of clicked user
 * 
 * @param {req} req request : userID as 'id' / FormData in body
 * @returns {number} Status Code
 */
exports.deleteUser = async (req, res, next)  => {
  const id = req.params.id

  try {
    await User.deleteOne({userID: id});

    return res.sendStatus(200);

  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * @typedef {object} req
 * @property {string} email
 * @property {string} password
 * 
 * @param {req} req request : userID as 'id' / FormData in body
 * @returns {number} Status Code (if 200 : redirect user)
 */
exports.authenticate = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email }, '-__v -createdAt -updateAt');
    if (user) {
      bcrypt.compare(password, user.password, function(err, response) {
        if (err) {
          throw new Error(err);
        }
        if (response) {
          delete user._doc.password;
          
          const expireIn = 24 * 60 * 60;
          const token = jwt.sign({
            user: user
          },
          process.env.SECRET_KEY,
          {
            expiresIn: expireIn
          });
          
          res.header('Authorization', 'Bearer ' + token);
          res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: expireIn });
          return res.status(200).redirect('/dashboard');
        }

        return res.status(403).json('Wrong Credentials');
      });
    } else {
      return res.status(404).json('User not found');
    }
  } catch (error) {
    return res.status(501).json(error);
  }
} 

/**
 * 
 * @param {req} req nothing particular
 * @returns {render} Redirect user
 */
exports.formCreateUser = (req, res, next)  => {
  try {
    res.render('formCreateUsers', { title: 'Ajouter un utilisateur' });
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * @typedef {object} req
 * @property {number} id 'userID' of user to update
 * 
 * @param {req} req request : userID as 'id'
 * @returns {number} Status Code (if 200, redirect user)
 */
exports.formUpdateUser = async (req, res, next) => {
  const id = req.params.id
  
  try {
    let user = await User.findOne({userID : id});

    if (user) {
      return res.status(200).render('formUpdateUsers', { title: 'Modifier un utilisateur', user: user});
    }

    return res.status(404).json('User not found');

  } catch (error) {
    return res.status(501).json(error);
  }
}