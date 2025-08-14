'use strict';

const logger = require('../../../core/utils/logger');
const doctorService = require('../services/doctor-service');

const create = (req, res) => {
    doctorService.create(req.body, (err, response) => {
        if (err) {
            logger.error('create function have error in controller ' + err.message);
            res.status(Number(err.status)).json({ status: err.status, message: err.message });
        } else {
            logger.info('create function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

const update = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ message: "Id is required" });
    }
    doctorService.update(req.params, req.body, (err, response) => {
        if (err) {
            logger.error('update function have error in controller', err.message);
            res.status(err.status).json({ status: err.status, message: err.message });
        } else {
            logger.info('update function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

const deleteDoctor = (req, res) => {
    doctorService.deleteDoctor(req.params, (err, response) => {
        if (err) {
            logger.error('deleteDoctor function have error in controller', err.message);
            res.status(err.status).json({ status: err.status, message: err.message });
        } else {
            logger.info('deleteDoctor function executed successfully in controller');
            res.status(200).json(response);
        }
    })
};

const getDoctors = (req, res) => {

    doctorService.getDoctors(req, (err, response) => {
        if (err) {
            logger.error('getDoctors function have error in controller', err.message);
            res.status(err.status).json({ status: err.status, message: err.message });
        } else {
            logger.info('getDoctors function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

const getDoctorById = (req, res) => {
    doctorService.getDoctorById(req.params, (err, response) => {
        if (err) {
            logger.error('getDoctorById function have error in controller', err.message);
            res.status(err.status).json({ status: err.status, message: err.message });
        } else {
            logger.info('getDoctorById function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

const testFunction = (req, res) => {
    res.status(200).json({ status: 200, message: 'This is coming form doctor controller' });
}

module.exports = { create, update, deleteDoctor, getDoctors, getDoctorById, testFunction };
