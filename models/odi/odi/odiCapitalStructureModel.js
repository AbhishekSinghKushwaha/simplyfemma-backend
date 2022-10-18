const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
    v4: uuidv4
} = require('uuid');

const odiCapitalStructureSchema = new Schema({

    userId: {
        type: String,
        // default: uuidv4(),
    },

    odiCapitalStructureCode: {
        type: Number,
        required: true
    },
    odiCapitalStructurePartyName: {
        type: String,
        required: true
    },
    odiCapitalStructureStack: {
        type: Number,
        required: true
    },
    odiCapitalStructurePartyOrigin: {
        type: String,
        required: true
    },
    odiCapitalStructureAmount: {
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

odiCapitalStructureModel = mongoose.model('odiCapitalStructureModel', odiCapitalStructureSchema, 'SF_ODI_I_Capital_Structure_D')

module.exports = odiCapitalStructureModel;