const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
    v4: uuidv4
} = require('uuid');

const aprRepatriationSchema = new Schema({


    userId: {
        type: String,
        // default: uuidv4()
    },


    aprRepatriationCode: {
        type: Number,
        required: true,
    },
    aprRepatriationDate: {
        type: Date,
        required: true,
    },
    aprRepatriationDividend: {
        type: Number,
        required: true,
    },
    aprRepatriationRepaymentLoan: {
        type: Number,
        required: true,
    },
    aprRepatriationEquity: {
        type: Number,
        required: true,
    },
    aprRepatriationRoyalties: {
        type: Number,
        required: true,
    },
    aprRepatriationTechFees: {
        type: Number,
        required: true,
    },
    aprRepatriationConsFees: {
        type: Number,
        required: true,
    },
    aprRepatriationOtherFees: {
        type: Number,
        required: true,
    },
    aprRepatriationProfit: {
        type: Number,
        required: true,
    },
    aprRepatriationRetainedEarning: {
        type: Number,
        required: true,
    },
    aprRepatriationFDIIndiaAmt: {
        type: Number,
        required: true,
    },
    aprRepatriationRefundShare: {
        type: Number,
        required: true,
    },
    aprRepatriationCurrentDate: {
        type: Date,
        required: true,
    },

}, {
    timestamps: true
});

aprRepatriationModel = mongoose.model('aprRepatriationModel', aprRepatriationSchema, 'SF_APR_Repatriation_D')

module.exports = aprRepatriationModel;
