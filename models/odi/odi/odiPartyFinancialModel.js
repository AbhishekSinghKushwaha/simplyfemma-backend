const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
    v4: uuidv4
} = require('uuid');

const odiPartyFinancialSchema = new Schema({

    userId: {
        type: String,
        // default : uuidv4(),
    },

    partyCode: {
        type: Number,
        required: true
    },
    odiPartyFinancialDate: {
        type: Date,
        required: true
    },
    odiPartyFinancialForexEarning: {
        type: Number,
        required: true
    },
    odiPartyFinancialNetProfit: {
        type: Number,
        required: true
    },
    odiPartyFinancialPaidupCapital: {
        type: Number,
        required: true
    },
    odiPartyFinancialNetWorth: {
        type: Number,
        required: true
    },
    odiPartyFinancialIndParty: {
        type: String,
        required: true
    },
    odiPartyFinancialGroupCompany: {
        type: String,
        required: true
    },
    currentDate: {
        type: Date,
        required: true
    },

}, {
    timestamps: true
});

odiPartyFinancialModel = mongoose.model('odiPartyFinancialModel', odiPartyFinancialSchema, 'SF_ODI_Party_Fin_D')

module.exports = odiPartyFinancialModel;