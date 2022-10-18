const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
    v4: uuidv4
} = require('uuid');

const odiSpvSchema = new Schema({

    userId: {
        type: String,
        default : uuidv4(),
    },

    odiSpvCode: {
        type: Number,
        required: true
    },
    odiSpvPurpose: {
        type: String,
        required: true
    },
    odiSpvFullAcquisationValue: {
        type: Number,
        required: true
    },
    odiSpvInfusion: {
        type: String,
        required: true
    },
    odiSpvGuarantedFund: {
        type: Number,
        required: true
    },
    odiSpvNonGuarantedFund: {
        type: Number,
        required: true
    },
    odiSpvEqFund: {
        type: Number,
        required: true
    },
    odiSpvSecuritisation: {
        type: Number,
        required: true
    },
    odiSpvOtherDetail: {
        type: String,
        required: true
    },
    odiSpvOtherDetailAmount: {
        type: Number,
        required: true
    },
    odiSpvTotal: {
        type: Number,
        required: true
    },
    currentDate: {
        type: Date,
        required: true
    },

}, {
    timestamps: true
});

odiSpvModel = mongoose.model('odiSpvModel', odiSpvSchema, 'SF_ODI_Spv_D')

module.exports = odiSpvModel;