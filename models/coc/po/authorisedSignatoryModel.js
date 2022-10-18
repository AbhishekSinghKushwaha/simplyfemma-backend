const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cocConnect = require('../../../dbconnections/cocConnection');

const {
    v4: uuidv4
} = require('uuid');

const poauthorisedSignatorySchema = new Schema({
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

poauthorisedsignatory = cocConnect.model('poauthorisedsignatory', poauthorisedSignatorySchema, 'SF_Authorised_Signatory_PO');

module.exports = poauthorisedsignatory;