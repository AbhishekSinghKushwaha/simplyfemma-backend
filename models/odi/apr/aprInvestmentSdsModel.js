const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
    v4: uuidv4
} = require('uuid');

const aprInvestmentSdsSchema = new Schema({


    userId: {
        type: String,
        // default: uuidv4()
    },

    aprInvestmentSdsName: {
        type: String,
        required: true,
    },

    aprInvestmentSdsCode: {
        type: String,
        required: true,
    },
    aprInvestmentSdsLevel: {
        type: String,
        required: true,
    },
    aprInvestmentSdsCountry: {
        type: String,
        required: true,
    },
    aprInvestmentSdsNameParent: {
        type: String,
        required: true,
    },
    aprInvestmentSdsLevelParent: {
        type: String,
        required: true,
    },
    aprInvestmentSdsCountryParent: {
        type: String,
        required: true,
    },
    aprInvestmentSdsInvAmount: {
        type: Number,
        required: true,
    },
    aprInvestmentSdsInvAmountDate: {
        type: Date,
        required: true,
    },
    aprInvestmentSdsInvType: {
        type: String,
        required: true,
    },
    aprInvestmentSdsType: {
        type: String,
        required: true,
    },
    aprInvestmentSdsActivityCode: {
        type: String,
        required: true,
    },
    aprInvestmentSdsPctStake: {
        type: Number,
        required: true,
    },
    aprInvestmentSdsDate: {
        type: Date,
        required: true,
    },
    aprInvestmentSdsCurrentDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true
});

aprInvestmentSdsModel = mongoose.model('aprInvestmentSdsModel', aprInvestmentSdsSchema, 'SF_APR_Investment_Sds_D')

module.exports = aprInvestmentSdsModel;