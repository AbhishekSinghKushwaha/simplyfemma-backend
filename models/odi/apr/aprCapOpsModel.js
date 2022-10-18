const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
    v4: uuidv4
} = require('uuid');

const aprCapOpsSchema = new Schema({


    userId: {
        type: String,
        // default: uuidv4()
    },

    aprCapOpsCode: {
        type: Number,
        required: true,
    },
    aprCapOpsDate: {
        type: Date,
        required: true,
    },
    aprCapOpsNetProfit: {
        type: Number,
        required: true,
    },
    aprCapOpsDividend: {
        type: Number,
        required: true,
    },
    aprCapOpsNetWorth: {
        type: Number,
        required: true,
    },
    aprCapOpscurrentDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true
});

aprCapOpsModel = mongoose.model('aprCapOpsModel', aprCapOpsSchema, 'SF_APR_Ops_D')

module.exports = aprCapOpsModel;