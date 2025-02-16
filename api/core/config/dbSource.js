const dotenv = require('dotenv');
dotenv.config();

const DbPwd = process.env.DB_URL;

module.exports = {
    newDbUrl: DbPwd
}