const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cocConnect = require('../../../dbconnections/cocConnection');

const {
    v4: uuidv4
} = require('uuid');

const boauthorisedSignatorySchema = new Schema({
    userId: {
        type: String,
        default : uuidv4(),
    },
    authorisedCode: {
        type: Number,
        required: true
    },
    nameOfPerson: {
        type: String,
        required: true
    },
    addressOfPerson: {
        type: String,
        required: true
    },
    Pannumber: {
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    currentDate: {
        type: Date,
        default: Date.now
    },

}, {
    timestamps: true
});

boauthorisedsignatory = cocConnect.model('boauthorisedsignatory', boauthorisedSignatorySchema, 'SF_Authorised_Signatory_BO');

module.exports = boauthorisedsignatory;