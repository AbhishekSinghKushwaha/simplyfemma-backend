const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cocConnect = require('../../../dbconnections/cocConnection');

const {
    v4: uuidv4
} = require('uuid');

const odicompoundingSubmissionSchema = new Schema({
    userId: {
        type: String,
        default : uuidv4(),
    },
    submissionCode: {
        type: Number,
        required: true
    },
    background_input: [{
        type: String,
        required: true
    }],
    transactionDetails: {
        type: String,
        required: true
    },
    natureofcontraventions_input: [{
        type: String,
        required: true
    }],
    delayreasons_input: [{
        type: String,
        required: true
    }],
    petitionrequest_input: [{
        type: String,
        required: true
    }],
    letterOfAuthority: {
        type: String,
        required: true
    },
    sample1:[{
        type: Map, 
        of: Boolean
    }],
    sample2:[{
        type: Map,
        of: Boolean,
    }],
    sample3:[{
        type: Map,
        of: Boolean,
    }],
    sample4:[{
        type: Map,
        of: Boolean,
    }],
    currentDate: {
        type: Date,
        default: Date.now
    },

}, {
    timestamps: true
});

odicompoundingSubmissionSchema.index({userId: 1});

odicompoundingsubmission = cocConnect.model('odicompoundingsubmission', odicompoundingSubmissionSchema, 'SF_Compounding_Submissions_ODI');

module.exports = odicompoundingsubmission;