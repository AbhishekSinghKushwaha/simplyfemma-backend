const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cocConnect = require('../../../dbconnections/cocConnection');

const {
    v4: uuidv4
} = require('uuid');

const odiSchema = new Schema({
    userId: {
        type: String,
        default : uuidv4(),
    },
    odiCode: {
        type: Number,
        required: true
    },
    nameTheApplicant:{
        type: String,
        required: true
    },
    dateIncorporationodi:{
        type: Date,
        default: Date.now
    },
    incometaxPan:{
        type: String,
        required: true
    },
    natureActivitiesUnderTaken:{
        type: String,
        required: true
    },
    nameOverseasEntity:{
        type: String,
        required: true
    },
    dOIOverseasEntity:{
        type: Date,
        default: Date.now
    },
    natureActivitiesUnderTakenByOverseasEntity:{
        type: String,
        required: true
    },
    natureEntityWOSorJV:{
        type: String,
        required: true
    },
    detailsRemittanceSentandDateOfRemittanceandAmountInFCYandInINR:{
        type: String,
        required: true
    },
    detailsOtherFinancialCommitment:{
        type: String,
        required: true
    },
    detailsUINAppliedAndRecieved:{
        type: String,
        required: true
    },
    dateReciept:{
        type: Date,
        default: Date.now
    },
    approvalOtherRegulatorsIfRequired:{
        type: String,
        required: true
    },
    detailsAPRSubmitted:{
        type: String,
        required: true
    },
    natureContraventionsAndReasonForTheContravention:{
        type: String,
        required: true
    },
    allSupportingDocumentsMaySubmitted:{
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

odidetails = cocConnect.model('odidetails', odiSchema, 'SF_ODI_Details_ODI');

module.exports = odidetails;