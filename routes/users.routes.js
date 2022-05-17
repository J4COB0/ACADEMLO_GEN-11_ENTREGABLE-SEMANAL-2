const express = require('express');
const router = express.Router();

// Controllers
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
} = require('../controllers/users.controllers');

// Middlewares
const {
    userExists,
    protectToken,
    protectAdmin,
    protectAccountOwner
} = require('../middlewares/users.middlewares');
const {
    checkValidations,
    createUserValidations,
    loginUserValidations
} = require('../middlewares/validations.middleware');

// Enpoints
router.get('/login', loginUserValidations, checkValidations, login);
router.post('/', createUserValidations, checkValidations, createUser);
router.use('/', protectToken);
router.get('/', getAllUsers);
router
    .route('/:id')
    .get(protectAdmin, userExists, getUserById)
    .patch(userExists, protectAccountOwner, updateUser)
    .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { userRouter: router };
