const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const { User } = require('../models/user.model');

//Utils
const { filterObject } = require('../utils/filterObject');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError.class');

// Enviroments
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const getAllUsers = catchAsync(async (req, res) => {
    const users = await User.findAll({
        where: { status: 'active' },
        attributes: { exclude: ['password'] }
    });

    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    });
});

const getUserById = catchAsync(async (req, res) => {
    const { user } = req;

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

const createUser = catchAsync(async (req, res) => {
    const { name, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        role
    });

    newUser.password = undefined;

    res.status(200).json({
        status: 'success',
        data: {
            newUser
        }
    });
});

const updateUser = catchAsync(async (req, res) => {
    const { user } = req;
    const data = filterObject(req.body, 'name', 'email');

    await user.update({ ...data });

    res.status(204).json({
        status: 'success'
    });
});

const deleteUser = catchAsync(async (req, res) => {
    const { user } = req;
    await user.update({ status: 'disabled' });

    res.status(200).json({
        status: 'success'
    });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate if the user exist with given email
    const user = await User.findOne({
        where: { email, status: 'active' }
    });

    if (!user) {
        return next(new AppError('Invalid credentials', 400));
    }

    // Compare user with db
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return next(new AppError('Invalid credentials', 400));
    }

    // Generate JWT
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    user.password = undefined;

    res.status(200).json({
        status: 'success',
        token,
        user
    });
});

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
};
