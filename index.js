'use strict';
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const dbConnect = require('./src/core/config/dbConnection');
const authRoutes = require('./src/modules/users/routes/auth-routes');
const userRoutes = require('./src/modules/users/routes/user.routes');
const projectRoutes = require('./src/modules/projects/routes/project.route');
const itemRoutes = require('./src/modules/items/routes/item.route');
const logger = require('./src/core/utils/logger');

const app = express();

const port = process.env.SERVER_PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Welcome to Dheeraj Digital Ready 1.0 - Prod');
});

app.listen(port, () => {
    logger.info(`Server is running on port : ${port}`);
    dbConnect.dbConnection();
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use('/api', projectRoutes);
app.use('/api', itemRoutes);

app.all('*', (req, res) => {
    res.status(404).json(`Cannot find ${req.originalUrl} on server, please check ur url request`);
});

process
    .on('unhandledRejection', (reason, p) => {
        logger.info(`${reason} Unhandled Rejection error ${p} `);
    })
    .on('uncaughtException', err => {
        logger.info('Uncaught Exception thrown - ', err);
        process.exit(1);
    });

module.exports = app;
