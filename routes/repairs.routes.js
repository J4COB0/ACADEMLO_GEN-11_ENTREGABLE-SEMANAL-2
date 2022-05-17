const express = require('express');
const router = express.Router();

// Controllers
const {
    getAllPendings,
    getPendingById,
    createAppointment,
    updateAppointment,
    canceldAppointment
} = require('../controllers/repairs.controllers');

// Middleware
const { pendingExist } = require('../middlewares/repairs.middlewares');
const { protectAdmin } = require('../middlewares/users.middlewares');
const {
    createRepairValidations,
    checkValidations
} = require('../middlewares/validations.middleware');

// Enpoints
router.post('/', createRepairValidations, checkValidations, createAppointment);
router.use('/', protectAdmin);
router.get('/', getAllPendings);
router
    .route('/:id')
    .get(pendingExist, getPendingById)
    .patch(pendingExist, updateAppointment)
    .delete(pendingExist, canceldAppointment);

module.exports = { repairRouter: router };
