const User = require('../models/User.js');

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