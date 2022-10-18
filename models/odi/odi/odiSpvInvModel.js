const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
    v4: uuidv4
} = require('uuid');

const odiSpvInvModelSchema = new Schema({

    userId: {
        type: String,
        default : uuidv4(),
    },

    odiSpvInvCode: {
        type: Number,
        required: true
    },
    odiSpvInvName: {
        type: String,
        required: true
    },
    odiSpvInvLevel: {
        type: String,
        required: true
    },
    odiSpvInvCountry: {
        type: String,
        required: true
    },
    odiSpvInvNameParent: {
        type: String,
        required: true
    },
    odiSpvInvLevelParent: {
        type: String,
        required: true
    },
    odiSpvInvCountryParent: {
        type: String,
        required: true
    },
    odiSpvInvInvType: {
        type: String,
        required: true
    },
    odiSpvInvType: {
        type: String,
        required: true
    },
    odiSpvInvActivityCode: {
        type: String,
        required: true
    },
    odiSpvInvAmount: {
        type: Number,
        required: true
    },
    odiSpvInvDate: {
        type: Date,
        required: true
    },
    odiSpvInvPctParent: {
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

odiSpvInvModel = mongoose.model('odiSpvInvModel', odiSpvInvModelSchema, 'SF_ODI_SPV_INV_D')

module.exports = odiSpvInvModel;