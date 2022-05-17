const { app } = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// Utils
const { db } = require('./utils/dataBase');
const { initModels } = require('./utils/initModels');

// Database aunthenticated
db.authenticate()
    .then(() => console.log('DataBase is authenticated'))
    .catch((err) => console.log(err));

// Init relations
initModels();

// Database synced
db.sync()
    .then(() => console.log('DataBase is synced'))
    .catch((err) => console.log(err));

// Spin up server
const PORT = process.env.PORT || 4000;
app.listen(process.env.PORT, () => {
    console.log(`Express are running on PORT: ${PORT}`);
});
