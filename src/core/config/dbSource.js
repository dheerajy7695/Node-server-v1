const dotenv = require('dotenv');
dotenv.config();

const DbPwd = process.env.LOCAL_DB_URL;

module.exports = {
    newDbUrl: DbPwd
}