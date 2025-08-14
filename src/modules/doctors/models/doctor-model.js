const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    monday: { from: String, to: String },
    tuesday: { from: String, to: String },
    wednesday: { from: String, to: String },
    thursday: { from: String, to: String },
    friday: { from: String, to: String },
    saturday: { from: String, to: String },
    sunday: { from: String, to: String }
}, { _id: false });

const doctorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    mobile: { type: String, required: true, match: /^[0-9]{10}$/ },
    maritalStatus: { type: String, required: true },
    qualification: { type: String, required: true },
    designation: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    createId: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true, match: /^[0-9]{6}$/ },
    image: { type: String },
    bio: { type: String, required: true },
    availability: availabilitySchema,
    username: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;