const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const partySchema = new Schema({

    userId : {
        type: String,
 
    },
    partyCode: {
        type: Number,
        required: true,
        // unique: true
    },

    partyName: {
        type: String,
        default: ''
    },
    partyAddress: {
        type: String,
        required: true
    },
    panNumber: {
        type: String,
        required: true
    },

    partyStatus: {
        type: String,
        required: true
    },

    signatoryName: {
        type: String,
        required: true
    },

    signatoryDesignation: {
        type: String,
        required: true
    },

    signatoryTelNo: {
        type: Number,
        required: true
    },

    signatoryFaxNo: {
        type: Number,
        required: true
    },

    auditorFirmName: {
        type: String,
        required: true
    },

    auditorFirmRegNumber: {
        type: Number,
        required: true
    },

    partyGroup: {
        type: String,
        required: true
    },
    activityCodeIP: {
        type: String,
        required: true
    },
    addressIP: {
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
    pin: {
        type: Number,
        required: true
    },

    contactPersonName: {
        type: String,
        required: true
    },

    contactPersonDesignation: {
        type: String,
        required: true
    },

    contactPersonTelno: {
        type: Number,
        required: true,
    },
    contactPersonFaxno: {
        type: Number,
        required: true,
    },
    contactPersonMobile: {
        type: Number,
        required: true,
    },
    contactPersonEmailId: {
        type: String,
        // trim: true,
        // lowercase: true,
        // required: true,
        // unique: true
    },

}, {
    timestamps: true
});

partyModel = mongoose.model('partyModel', partySchema, 'SFPARTYM')

module.exports = partyModel;