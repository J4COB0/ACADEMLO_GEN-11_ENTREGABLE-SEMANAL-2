// Models
const { User } = require('../models/user.model');
const { Repair } = require('../models/repair.model');

const initModels = () => {
    // 1 User <----> M Repairs
    User.hasMany(Repair);
    Repair.belongsTo(User);
};

module.exports = { initModels };
