const express = require('express');
const router = express.Router();

const doctorController = require('../controllers/doctor.controller');
const isUserAuthenticated = require('../../../core/middleware/authMiddleware');

router.post('/create', doctorController.create);
router.patch('/update/:id', isUserAuthenticated, doctorController.update);
router.delete('/delete/:id', isUserAuthenticated, doctorController.deleteDoctor);

router.get('/get', doctorController.getDoctors);
router.get('/get/:id', doctorController.getDoctorById);

router.get('/get-test', doctorController.testFunction);

module.exports = router;