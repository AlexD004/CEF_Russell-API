const Catway = require('../models/Catway.js')

/**
 * @param {*} req nothing particular
 * @returns {number} Status Code (if 200, redirect user)
 */
exports.getCatways = async (req, res, next) => {

  try {
    let catways = await Catway.find();

    if (catways) {
      return res.status(200).render('catways', { title: 'Liste des Catways', catways: catways});
    }

    return res.status(404).json('Catways not found');

  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * @typedef {object} req
 * @property {number} id 'catwayNumber' of clicked catway
 * 
 * @param {req} req request with catwayNumber as 'id'
 * @returns {number} Status Code (if 200, redirect user)
 */
exports.getCatwayById = async (req, res, next) => {
  const id = req.params.id

  try {
    let catway = await Catway.findOne({catwayNumber : id});

    if (catway) {
      return res.status(200).render('catway', { title: 'Catway N°'+id, catway: catway});
    }

    return res.status(404).json('Catway not found');

  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 * 
 * @param {req} req request with FormData in body
 * @returns {number} Status Code
 */
exports.createCatway = async (req, res, next) => { 
  const temp = ({
    catwayNumber: req.body.catwayNumber,
    type: req.body.type,
    catwayState: req.body.catwayState
  });
  try {
    await Catway.create(temp);

    return res.sendStatus(201);

  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * @typedef {object} req
 * @property {number} id 'catwayNumber' of clicked catway
 * 
 * @param {req} req request : catwayNumber as 'id' / FormData in body
 * @returns {number} Status Code
 */
exports.updateCatway = async (req, res, next) => {
  const id = req.params.id
  const temp = ({
    catwayNumber: req.body.catwayNumber,
    type: req.body.type,
    catwayState: req.body.catwayState
  });

  try {
    let catway = await Catway.findOne({catwayNumber : id});

    if (catway) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          catway[key] = temp[key]
        }
      });

      await catway.save();
      return res.status(201).json(catway);
    }

    return res.status(404).json('Catway not found');

  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * @typedef {object} req
 * @property {number} id 'catwayNumber' of clicked catway
 * 
 * @param {req} req request : catwayNumber as 'id'
 * @returns {number} Status Code
 */
exports.deleteCatway = async (req, res, next)  => {
  const id = req.params.id
  try {
    await Catway.deleteOne({catwayNumber: id});

    return res.sendStatus(200);

  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * 
 * @param {req} req nothing particular
 * @returns {render} Redirect user
 */
exports.formCreateCatway = (req, res, next)  => {
  try {
    res.render('formCreateCatways', { title: 'Ajouter un catway' });
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * @typedef {object} req
 * @property {number} id 'catwayNumber' of catway to update
 * 
 * @param {req} req request : catwayNumber as 'id'
 * @returns {number} Status Code (if 200, redirect user)
 */
exports.formUpdateCatway = async (req, res, next) => {
  const id = req.params.id
  
  try {
    let catway = await Catway.findOne({catwayNumber : id});

    if (catway) {
      return res.status(200).render('formUpdateCatways', { title: 'Modifier un catway', catway: catway});
    }

    return res.status(404).json('Catway not found');

  } catch (error) {
    return res.status(501).json(error);
  }
}