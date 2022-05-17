const { body, validationResult } = require('express-validator');

const createUserValidations = [
    body('name').notEmpty().withMessage('Name can not be empty'),
    body('email')
        .notEmpty()
        .withMessage('Email can not be empty')
        .isEmail()
        .withMessage('Must provide a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password can not be empty')
        .isLength({ min: 4 })
        .withMessage('The password must be at least 4 characters')
];

const loginUserValidations = [
    body('email')
        .notEmpty()
        .withMessage('Email can not be empty')
        .isEmail()
        .withMessage('Must provide a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password can not be empty')
];

const createRepairValidations = [
    body('date')
        .notEmpty()
        .withMessage('Date can be not empty')
        .isDate()
        .withMessage('Must provide a valid date'),
    body('computerNumber')
        .notEmpty()
        .withMessage('ComputerNumber can not be empty')
        .isNumeric()
        .withMessage('ComputerNumber must be a numeric'),
    body('comments').notEmpty().withMessage('Comments can not be empty')
];

const checkValidations = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const messages = errors.array().map(({ msg }) => msg);
        const errorMsg = messages.join('. ');

        res.status(400).json({
            status: 'error',
            message: errorMsg
        });
    }
    next();
};

module.exports = {
    createUserValidations,
    createRepairValidations,
    loginUserValidations,
    checkValidations
};
