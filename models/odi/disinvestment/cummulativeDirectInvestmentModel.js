const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
    v4: uuidv4
} = require('uuid');

const cummulativeDirectInvestmentSchema = new Schema({

    userId: {
        type: String,
        // required: true,
        // default : uuidv4()
    },

    cummulativeDirectInvestmentCode: {
        type: Number,
        required: true,
    },


    cummulativeDirectInvestmentType: {
        type: String,
        required: true,
    },

    cummulativeDirectInvestmentAmount: {
        type: Number,
        required: true,
    },


    cummulativeDirectInvestmentCurrentDate: {
        type: String,
        default: new Date()
    }

}, {
    timestamps: true
});

cummulativeDirectInvestmentModel = mongoose.model('cummulativeDirectInvestmentModel', cummulativeDirectInvestmentSchema, 'SF_Cumulative_Direct_Inv_D')

module.exports = cummulativeDirectInvestmentModel;