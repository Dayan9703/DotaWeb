const mongoose = require('mongoose')
const ENGINE_DB = process.env.ENGINE_DB
const {dbConnectMySql} = require('./config/mysql')
const dbConnectNoSql = require('./config/mongo')

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

if (ENGINE_DB === "mysql") {
    dbConnectMySql();
    return;
}
if (ENGINE_DB === "mongo") {
    dbConnectNoSql();
    return;
}

if (ENGINE_DB === "nosql") {
    mongoose.connect(MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then(db => console.log('Database is connected'))
        .catch(err => console.log(err));
    return;
}

