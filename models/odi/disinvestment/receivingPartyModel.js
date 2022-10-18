const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
    v4: uuidv4
} = require('uuid');

const receivingPartySchema = new Schema({

    userId: {
        type: String,
        // default : uuidv4(),
    },

    receivingPartyCode: {
        type: String,
        required: true,
    },


    receivingPartyName: {
        type: String,
        required: true,
    },

    receivingPartyPct: {
        type: Number,
        required: true
    },

    receivingPartyCurrentDate: {
        type: String,
        default: new Date()
    }

}, {
    timestamps: true
});

receivingPartyModel = mongoose.model('receivingPartyModel', receivingPartySchema, 'SF_Receiving_Party_D')

module.exports = receivingPartyModel;