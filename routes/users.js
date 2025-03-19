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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer la liste des utilisateurs
 *     description: Retourne la liste des utilisateurs enregistrés dans la base de données.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès.
 *         content:
 *           text/html:
 *             example: "Redirection vers la vue qui affiche la liste des utilisateurs."
 *       404:
 *         description: Aucun utilisateur trouvé.
 *       501:
 *         description: La requête demandée n'est pas supportée pour cette ressource.
 */
router.get('/', checkJWT, getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupérer la liste des utilisateurs
 *     description: Retourne la liste des utilisateurs enregistrés dans la base de données.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur à récupérer. Correspond à 'userID' dans la base de données.
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès.
 *         content:
 *           text/html:
 *             example: "Redirection vers la vue qui affiche les détails d'un utilisateur."
 *       404:
 *         description: Aucun utilisateur trouvé.
 *       501:
 *         description: La requête demandée n'est pas supportée pour cette ressource.
 */
router.get('/:id', checkJWT, getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Enregistre un nouvel utilisateur dans la base de données.
 *     tags:
 *       - Users
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                userID (automatique):
 *                   type: integer
 *                   example: 42
 *                name:
 *                   type: string
 *                   example: 'John Doe'
 *                email:
 *                   type: string
 *                   example: 'jdoe@gmail.com'
 *                password:
 *                   type: string
 *                   example: 'jdoe123'
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès.
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
 *                   userID:
 *                     type: integer
 *                     example: 42 //userID du nouvel utilisateur
 *       501:
 *         description: La requête demandée n'est pas supportée pour cette ressource.
 */
router.post('/', checkJWT, createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Modifier un utilisateur
 *     description: Actualise les informations d'un utilisateur déjà enregistré dans la base de données.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur à modifier. Correspond à 'userID' dans la base de données.
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                userID (automatique):
 *                   type: integer
 *                   example: 42
 *                name:
 *                   type: string
 *                   example: 'John Doe'
 *                email:
 *                   type: string
 *                   example: 'jdoe@gmail.com'
 *                password:
 *                   type: string
 *                   example: 'jdoe123'
 *     responses:
 *       201:
 *         description: Utilisateur modifié avec succès.
 *       404:
 *         description: L'utilisateur à modifier n'a pas été trouvé.
 *       501:
 *         description: La requête demandée n'est pas supportée pour cette ressource.
 */
router.put('/:id', checkJWT, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Supprime l'utilisateur de la base de données.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur à supprimer. Correspond à 'userID' dans la base de données.
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *       501:
 *         description: La requête demandée n'est pas supportée pour cette ressource.
 */
router.delete('/:id', checkJWT, deleteUser);

/* AUTHENTICATE */
router.post('/authenticate', authenticate)

module.exports = router;
