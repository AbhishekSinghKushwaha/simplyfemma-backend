const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
    v4: uuidv4
} = require('uuid');

const aprSchema = new Schema({


    userId: {
        type: String,
        // default: uuidv4()
    },

    aprDate: {
        type: Date,
        required: true,
    },
    aprJVPeriod: {
        type: Date,
        required: true,
    },
    aprCapStructureCode: {
        type: Number,
    },
    aprOpsDetailCode: {
        type: Number,
    },
    aprRepatriationDetailCode: {
        type: Number,
    },
    aprInvestmentSDSDetailCode: {
        type: Number,
    },
    aprCertificateCode: {
        type: String,
        required: true,
    },
    aprDesignatedSignature: {
        type: String,
        required: true,
    },
    partyCode: {
        type: String,
    },
    aprDesignatedPlace: {
        type: String,
        required: true,
    },
    aprDesignatedSignDate: {
        type: Date,
        required: true,
    },
    aprStatutoryAudit: {
        type: String,
        required: true,
    },
    aprStatutorySignature: {
        type: String,
        required: true,
    },
    aprStatutoryPlace: {
        type: String,
        required: true,
    },
    aprStatutorySignDate: {
        type: Date,
        required: true,
    },
    aprStatutoryCurrentDate: {
        type: Date,
        required: true,
    },

}, {
    timestamps: true
});

aprModel = mongoose.model('aprModel', aprSchema, 'SF_APR_D')

module.exports = aprModel;