const mongoose = require('mongoose');

var SF_ODI_JvWos_Detail = require("./odiJvWosModel")
const Schema = mongoose.Schema;
const {
    v4: uuidv4
} = require('uuid');

const odiSchema = new Schema({

    userId: {
        type: String,
    //    default: uuidv4(),
    },

    odiInvestmentRoute: {
        type: String,
        required: true
    },
    partyCode: {
        type: Number,
        required: true
    },
    odiNetworth: {
        type: Number,
        required: true
    },
    odiNetworthonDate: {
        type: Number,
        required: true
    },
    odiJvWosDetail: {
        type: Boolean,
        required: true
    },
    odiJvWosCode: {
        type: Number,
    },

    odiInvestigation: {
        type: Boolean,
        required: true
    },
    investigationAgencyCode: {
        type: Number,
    },
    odiJvWosAccountingyear: {
        type: Date,
        required: true
    },
    odiJvWosActivitycode: {
        type: Number,
        required: true
    },
    odiJvWosEstimatedcostAcquisition: {
        type: Number,
        required: true
    },
    odiJvWosFinancialcommitmentcurrent: {
        type: Number,
        required: true
    },
    odiJvWosFinancialcommitmentAll: {
        type: Number,
        required: true
    },
    odiJvWosSPV: {
        type: Boolean,
        required: true
    },
    odiSpvCode: {
        type: Number,
    },
    odiCapitalStructureCode: {
        type: Number,
    },
    odiSpvInvDetail: {
        type: Boolean,
        required: true
    },
    odiSpvInvDetailCode: {
        type: Number,
    },
    odiSpvInvPurpose: {
        type: String,
        required: true
    },
    odiInvMethod: {
        type: String,
        required: true
    },
    odiInvCategory: {
        type: String,
        required: true
    },
    odiInvOtherDetail: {
        type: String,
        required: true
    },
    odiRemittanceAmount: {
        type: Number,
        required: true
    },
    odiDeclaration: {
        type: String,
        required: true
    },
    odiPlace: {
        type: String,
        required: true
    },
    odiDate: {
        type: Date,
        required: true
    },
    odiCurrentDate: {
        type: Date,
        required: true
    },
    

}, {
    timestamps: true
});

odiModel = mongoose.model('odiModel', odiSchema, 'SF_ODI_I_D')

module.exports = odiModel;