const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cocConnect = require('../../dbconnections/cocConnection');
const {
    v4: uuidv4
} = require('uuid');

const officeDetailsSchema = new Schema({
    userId: {
        type: String,
        default : uuidv4(),
    },
    officeCode: {
        type: Number,
        required: true,
    },
    officeEmailAddress: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
    officeTelNo: {
        type: Number,
        required: true
    },
    officeFaxNo: {
        type: Number,
        required: true
    },
    codBuildingNo: {
        type: String,
        required: true
    },
    floorNo: {
        type: Number,
        required: true
    },
    nameOfPremises: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    legalNameOfBusiness: {
        type: String,
        required: true
    },
    dateOfIncorporation: {
        type: Date,
        default: Date.now
    },
    panNo: {
        type: Number,
        required: true
    },
    cinNo: {
        type: Number,
        required: true 
    }
});

officedetails = cocConnect.model('officedetails', officeDetailsSchema, 'SF_Office_Details');

module.exports = officedetails;