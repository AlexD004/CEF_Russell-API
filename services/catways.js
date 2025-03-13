const Catway = require('../models/Catway.js')

/* GET Catways. */
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

/* GET Catway Details. */
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

/* POST New Catway. */
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

/* PUT to update Catway. */
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

/* DELETE Catway. */
exports.deleteCatway = async (req, res, next)  => {
  const id = req.params.id
  try {
    await Catway.deleteOne({catwayNumber: id});

    return res.sendStatus(200);

  } catch (error) {
    return res.status(501).json(error);
  }
};