
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bankSchema = new Schema({
    bankCode: {
        type: Number,
        required: true,
        // unique: true
    },
 
    bankName: {
        type: String,
        default: ''
    },
    bankAddress: {
        type: String,
        required: true
    },

    userId : {
        type: String,
    }

}, {
    timestamps: true
});

bankModel = mongoose.model('bankModel', bankSchema, 'SF_BANK_M')

module.exports = bankModel;