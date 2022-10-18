const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
    v4: uuidv4
} = require('uuid');

const disinvestmentSchema = new Schema({

    userId: {
        type: String,
        // default: uuidv4()
    },

    disInvestmentBankcode: {
        type: Number,
    },
    disInvestmentPeriod: {
        type: String,
        required: true,
    },
    disInvestmentPartyCode: {
        type: String,
    },
    disInvestmentRoute: {
        type: String,
        required: true,
    },
    disInvestmentType: {
        type: String,
        required: true,
    },
    disInvestmentDate: {
        type: Date,
        required: true,
    },
    disInvestmentPANNo: {
        type: String,
        required: true,
    },
    disInvestmentReceivingPartyName: {
        type: String,
    },
    disInvestmentActivityDetail: {
        type: String,
        required: true,
    },
    disInvestmentMethod: {
        type: String,
        required: true,
    },
    disInvestmentPartyHoldingPct: {
        type: Number,
        required: true,
    },
    disInvestmentCumulativeDirectInvCode: {
        type: Number,
    },
    disInvestmentDatewiseRemitanceDetailCode: {
        type: Number,
    },
    disInvestmentFairValue: {
        type: String,
        required: true,
    },
    disInvestmentWriteOff: {
        type: Boolean,
        required: true,
    },
    disInvestmentWriteOffType: {
        type: String,
        required: true,
    },
    disInvestmentWriteOffAmount: {
        type: Number,
        required: true,
    },
    disInvestmentAmountWriteOff: {
        type: Number,
        required: true,
    },
    disInvestmentAmountRepatriated: {
        type: Boolean,
        required: true,
    },
    disInvestmentAmountRepatriatedDate: {
        type: String,
        required: true,
    },
    disInvestmentAmountRepatriatedType: {
        type: String,
        required: true,
    },
    disInvestmentAmountRepatriatedAmount: {
        type: Number,
        required: true,
    },
    disInvestmentTotalAmountRepatriatedAPR: {
        type: Boolean,
        required: true,
    },
    disInvestmentTotalRepatriatedType: {
        type: String,
        required: true,
    },
    disInvestmentTotalRepatriatedAmount: {
        type: Number,
        required: true,
    },
    disInvestmentTotalRepatriatedDate: {
        type: Date,
        required: true,
    },
    disInvestmentCertificate: {
        type: String,
        required: true,
    },
    disInvestmentPlace: {
        type: String,
        required: true,
    },
    disInvestmentAnnexture: {
        type: String,
        required: true,
    },
    disInvestmentCurrentDate: {
        type: Date,
        required: true,
    },

}, {
    timestamps: true
});

disinvestmentModel = mongoose.model('disinvestmentModel', disinvestmentSchema, 'SF_Disinvestment_D')

module.exports = disinvestmentModel;