// Models
const { Repair } = require('../models/repair.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError.class');

const pendingExist = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const pending = await Repair.findOne({
        where: {
            status: 'pending',
            id
        }
    });

    if (!pending) {
        return next(new AppError('Pending doesnt exist by given ID', 404));
    }

    req.pending = pending;
    next();
});

module.exports = { pendingExist };
