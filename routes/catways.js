const express = require('express');
const router = express.Router();

const { checkJWT } = require('../middlewares/private')

const {
  getCatways,
  getCatwayById,
  createCatway,
  updateCatway,
  deleteCatway,
  formCreateCatway,
  formUpdateCatway
} = require('../services/catways.js')

const {
  getBookings,
  getBookingById,
  createBooking,
  deleteBooking,
  formCreateBooking
} = require('../services/bookings.js')

/* ROUTES FOR BOOKING */

/* FORM CREATE Booking */
router.get('/:id/create-reservation',checkJWT, formCreateBooking);

/**
 * @swagger
 * /catways/{id}/reservations:
 *   get:
 *     summary: Récupérer la liste des réservations d'un catway
 *     description: Retourne la liste des réservations enregistrées dans la base de données pour un catway en particulier.
 *     tags:
 *       - Catways
 *       - Réservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du Catway concerné. Correspond à 'catwayNumber' dans la base de données.
 *     responses:
 *       200:
 *         description: Liste des réservations récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 catways:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       catwayNumber:
 *                         type: integer
 *                         example: 42
 *                       type:
 *                         type: string
 *                         example: 'short'
 *                       catwayState:
 *                         type: string
 *                         example: 'bon état'
 *                 bookings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       bookId:
 *                         type: integer
 *                         example: 12
 *                       catwayNumber:
 *                         type: integer
 *                         example: 42
 *                       clientName:
 *                         type: string
 *                         example: 'Davy Jones'
 *                       boatName:
 *                         type: string
 *                         example: 'Hollandais Volant'
 *                       checkIn:
 *                         type: string
 *                         format: date
 *                         example: '2025-03-19'
 *                       checkOut:
 *                         type: string
 *                         format: date
 *                         example: '2025-05-19'
 *       404:
 *         description: Aucune réservation trouvée.
 *       501:
 *         description: La requête demandée n'est pas supportée pour cette ressource.
 */
router.get('/:id/reservations', checkJWT, getBookings);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   get:
 *     summary: Récupérer une réservation en particulier
 *     description: Retourne les détails d'une réservation enregistrée dans la base de données pour un catway en particulier.
 *     tags:
 *       - Catways
 *       - Réservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du Catway concerné. Correspond à 'catwayNumber' dans la base de données.
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la réservation concernée. Correspond à 'bookId' dans la base de données.
 *     responses:
 *       200:
 *         description: Réservation récupérée avec succès.
 *         content:
 *           text/html:
 *             example: "Redirection vers la vue qui affiche les détails d'une réservation."
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 catways:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       catwayNumber:
 *                         type: integer
 *                         example: 42
 *                       type:
 *                         type: string
 *                         example: 'short'
 *                       catwayState:
 *                         type: string
 *                         example: 'bon état'
 *                 bookings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       bookId:
 *                         type: integer
 *                         example: 12
 *                       catwayNumber:
 *                         type: integer
 *                         example: 42
 *                       clientName:
 *                         type: string
 *                         example: 'Davy Jones'
 *                       boatName:
 *                         type: string
 *                         example: 'Hollandais Volant'
 *                       checkIn:
 *                         type: string
 *                         format: date
 *                         example: '2025-03-19'
 *                       checkOut:
 *                         type: string
 *                         format: date
 *                         example: '2025-05-19'
 *       404:
 *         description: Aucune réservation trouvée.
 *       501:
 *         description: La requête demandée n'est pas supportée pour cette ressource.
 */
router.get('/:id/reservations/:idReservation', checkJWT, getBookingById);

/**
 * @swagger
 * /catways/{id}/reservations:
 *   post:
 *     summary: Créer une nouvelle réservation
 *     description: Enregistre une nouvelle réservation dans la base de données.
 *     tags:
 *       - Catways
 *       - Réservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du Catway concerné. Correspond à 'catwayNumber' dans la base de données.
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                bookId (automatique):
 *                   type: integer
 *                   example: 42 // S'enregistre automatiquement
 *                catwayNumber (automatique):
 *                   type: integer
 *                   example: 12 // Correspond au paramètre 'id', s'enregistre automatiquement
 *                clientName:
 *                   type: string
 *                   example: 'Davy Jones'
 *                boatName:
 *                   type: string
 *                   example: 'Hollandais Volant'
 *                checkIn:
 *                   type: date
 *                   example: 2025-03-19
 *                checkOut:
 *                   type: date
 *                   example: 2025-04-19
 *     responses:
 *       201:
 *         description: Réservation enregistrée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: integer
 *                     example: 201
 *                   newBookId:
 *                     type: integer
 *                     example: 42 //bookId de la nouvelle réservation
 *       501:
 *         description: La requête demandée n'est pas supportée pour cette ressource.
 */
router.post('/:id/reservations', checkJWT, createBooking);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   delete:
 *     summary: Supprimer une réservation
 *     description: Supprime la réservation de la base de données.
 *     tags:
 *       - Catways
 *       - Réservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du Catway à concerné. Correspond à 'catwayNumber' dans la base de données.
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la réservation à supprimer. Correspond à 'bookId' dans la base de données.
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès.
 *       501:
 *         description: La requête demandée n'est pas supportée pour cette ressource.
 */
router.delete('/:id/reservations/:idReservation', checkJWT, deleteBooking);

/* ----- */

/* FORM CREATE Catway */
router.get('/create-catways',checkJWT, formCreateCatway);
/* FORM UPDATE Catway */
router.get('/update-catways/:id',checkJWT, formUpdateCatway);

/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Récupérer la liste des catways
 *     description: Retourne la liste des catways enregistrés dans la base de données.
 *     tags:
 *       - Catways
 *     responses:
 *       200:
 *         description: Liste des catways récupérée avec succès.
 *         content:
 *           text/html:
 *             example: "Redirection vers la vue qui affiche la liste des catways."
 *       404:
 *         description: Aucun catway trouvé.
 *       501:
 *         description: La requête demandée n'est pas supportée pour cette ressource.
 */
router.get('/', checkJWT, getCatways);

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupérer un catway en particulier
 *     description: Retourne les informations concernant un catway en particulier, enregistré dans la base de données.
 *     tags:
 *       - Catways
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du Catway à récupérer. Correspond à 'catwayNumber' dans la base de données.
 *     responses:
 *       200:
 *         description: Catway récupéré avec succès.
 *         content:
 *           text/html:
 *             example: "Redirection vers la vue qui affiche les détails d'un catway."
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   catwayNumber:
 *                     type: integer
 *                     example: 42
 *                   type:
 *                     type: string
 *                     example: 'short'
 *                   catwayState:
 *                     type: string
 *                     example: 'bon état'
 *       404:
 *         description: Le catway demandé n'a pas été trouvé.
 *       501:
 *         description: La requête demandée n'est pas supportée pour cette ressource.
 */
router.get('/:id', checkJWT, getCatwayById); 

/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Créer un nouveau catway
 *     description: Enregistre un nouveau catway dans la base de données.
 *     tags:
 *       - Catways
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                catwayNumber:
 *                   type: integer
 *                   example: 42
 *                type:
 *                   type: string
 *                   example: 'short'
 *                catwayState:
 *                   type: string
 *                   example: 'bon état'
 *     responses:
 *       200:
 *         description: Catway enregistré avec succès.
 *       501:
 *         description: La requête demandée n'est pas supportée pour cette ressource.
 */
router.post('/', checkJWT, createCatway);

/**
 * @swagger
 * /catways/{id}:
 *   put:
 *     summary: Modifier un catway
 *     description: Actualise les informations d'un catway déjà enregistré dans la base de données.
 *     tags:
 *       - Catways
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du Catway à modifier. Correspond à 'catwayNumber' dans la base de données.
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                catwayNumber:
 *                   type: integer
 *                   example: 42
 *                type:
 *                   type: string
 *                   example: 'short'
 *                catwayState:
 *                   type: string
 *                   example: 'bon état'
 *     responses:
 *       201:
 *         description: Catway modifié avec succès.
 *       404:
 *         description: Le catway à modifier n'a pas été trouvé.
 *       501:
 *         description: La requête demandée n'est pas supportée pour cette ressource.
 */
router.put('/:id', checkJWT, updateCatway);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprimer un catway
 *     description: Supprime le catway de la base de données.
 *     tags:
 *       - Catways
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du Catway à supprimer. Correspond à 'catwayNumber' dans la base de données.
 *     responses:
 *       200:
 *         description: Catway supprimé avec succès.
 *       501:
 *         description: La requête demandée n'est pas supportée pour cette ressource.
 */
router.delete('/:id', checkJWT, deleteCatway);

module.exports = router;