const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* GET Users. */
exports.getUsers = async (req, res, next) => {

  try {
    let users = await User.find();

    if (users) {
      return res.status(200).json(users);
    }

    return res.status(404).json('Users not found');

  } catch (error) {
    return res.status(501).json(error);
  }
}

/* GET User Details. */
exports.getUserById = async (req, res, next) => {
  const id = req.params.id
  
  try {
    let user = await User.findOne({userID : id});

    if (user) {
      return res.status(200).json(user);
    }

    return res.status(404).json('User not found');

  } catch (error) {
    return res.status(501).json(error);
  }
}

/* POST New User. */
exports.createUser = async (req, res, next) => { 
  const temp = ({
    userID      : req.body.userID,
    name    : req.body.name,
    email   : req.body.email,
    password: req.body.password
  });

  try {
    let user = await User.create(temp);

    return res.status(201).json(user);

  } catch (error) {
    return res.status(501).json(error);
  }
};

/* PUT to updateUuser. */
exports.updateUser = async (req, res, next) => {
  const id = req.params.id
  const temp = ({
    userID      : req.body.userID,
    name    : req.body.name,
    email   : req.body.email,
    password: req.body.password
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

/* DELETE User. */
exports.deleteUser = async (req, res, next)  => {
  const id = req.params.id

  try {
    await User.deleteOne({userID: id});

    return res.status(201).json('User deleted');

  } catch (error) {
    return res.status(501).json(error);
  }
};

/* Method for auth */
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
          //return res.status(200).json('authenticate_succeed');
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
