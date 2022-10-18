const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const investmentTypeSchema = new Schema({
    investmentTypePartCode: {
        type: Number,
        required: true,
    },
    investmentType: {
        type: String,
        required: true,
    },

    userId : {
        type: String,
 
    }

}, {
    timestamps: true
});

investmentTypeModel = mongoose.model('investmentTypeModel', investmentTypeSchema, 'SF_InvestmentType_M')

module.exports = investmentTypeModel;