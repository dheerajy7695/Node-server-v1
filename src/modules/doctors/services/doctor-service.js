'use strict';

const logger = require('../../../core/utils/logger');
const doctorModel = require('../models/doctor-model');

const create = async (doctorData, cb) => {

    try {
        const doctorExist = await doctorModel.findOne({ email: doctorData.email });
        if (doctorExist) {
            logger.error('create function has error - doctor already exist', doctorData.email);
            return cb({ status: 409, message: 'Doctor already exist!' });
        }

        const createDoctorObj = new doctorModel(doctorData);
        const newDoctor = await createDoctorObj.save();

        if (newDoctor?._doc?.password) delete newDoctor._doc.password;
        logger.info('create doctor function executed successfully');
        return cb(null, newDoctor);
    } catch (err) {
        logger.error('create doctor function has error', err);
        if (err?.code) {
            return cb({ message: err.message || 'Something went wrong, please try again!', status: 409 });
        } else {
            return cb({ message: err.message || 'Something went wrong, please try again!', status: err.status || "400" });
        }
    }
};

const update = async (params, reqPayload, cb) => {

    let dbQuery = { _id: params.id || params._id };

    try {
        if (reqPayload.password) cb({ status: 400, message: 'You can not update the password using this endpoint' });

        const doctorExist = await doctorModel.findById(dbQuery);
        if (!doctorExist) {
            logger.error('update doctor function has error- doctor not found');
            cb({ status: 404, message: "Doctor not found or you don't have access for this operation" });
        }

        const updateObj = await doctorModel.findByIdAndUpdate(dbQuery, reqPayload, { runValidators: false }, { new: false });

        if (updateObj?._doc?.password) delete updateObj._doc.password;
        logger.info('update doctor function executed successfully');
        cb(null, updateObj);

    } catch (error) {
        logger.error('update doctor function has error- doctor not found');
        cb({ status: error.error || 404, message: error.message || "Doctor not found or you don't have access for this operation" });
    }
};

const deleteDoctor = async (params, cb) => {

    let dbQuery = { _id: params.id || params._id };

    try {
        const deleteDoctor = await doctorModel.findByIdAndDelete(dbQuery);
        if (deleteDoctor) {
            logger.info('deleteDoctor function executed successfully');
            cb(null, deleteDoctor._doc);
        } else {
            logger.error('deleteDoctor function has error - Doctor not found!');
            cb({ status: 404, message: 'Doctor not found!' });
        }
    } catch (err) {
        logger.error('deleteDoctor function has error', err);
        cb({ status: err.status || 404, message: err.message || 'Doctor not found!' });
    }
};

const getDoctors = async (params, cb) => {
    try {
        const doctorData = await doctorModel.find({}, { password: 0 }).sort({ createdAt: -1 });

        if (doctorData) {
            logger.info('getDoctors function has executed successfully');
            cb(null, { status: 201, doctors: doctorData });
        } else {
            logger.error('getDoctors function has error', err);
            cb({ status: 404, message: 'Doctor not found!' });
        }
    } catch (err) {
        logger.error('getDoctors function has error', err);
        cb({ status: err.status || 404, message: err.message || 'Doctor not found!' });
    }
};

const getDoctorById = async (params, cb) => {
    try {
        const doctorData = await doctorModel.findById(params.id, { password: 0 });
        if (doctorData) {
            logger.info('getDoctorById function has executed successfully');
            cb(null, { status: 200, doctor: doctorData });
        } else {
            logger.error('getDoctorById function has error', err);
            cb({ status: 404, message: 'Doctor not found!' });
        }
    } catch (err) {
        logger.error('getDoctorById function has error', err);
        cb({ status: err.status || 404, message: err.message || 'Doctor not found!' });
    }
};

module.exports = {
    create,
    update,
    deleteDoctor,
    getDoctors,
    getDoctorById
}