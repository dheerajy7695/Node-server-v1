const dotenv = require('dotenv');
dotenv.config();

const DbPwd = process.env.DB_PASSWORD;

module.exports = {
    dbUrl: 'mongodb+srv://testAdmin:Node_pwd65@dheeraj-mongodb.sofjk.mongodb.net/test',
    newDbUrl: `mongodb+srv://javascript142:${DbPwd}@cluster0.uvxhe.mongodb.net/`
}