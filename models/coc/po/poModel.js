const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cocConnect = require('../../../dbconnections/cocConnection');

const {
    v4: uuidv4
} = require('uuid');

const poSchema = new Schema({
    userId: {
        type: String,
        default : uuidv4(),
    },
    boCode: {
        type: Number,
        required: true
    },
    nameApplicant:{
        type: String,
        required: true
    },
    dateIncorporationpo:{
        type: Date,
        default: Date.now
    },
    incometaxPan:{
        type: String,
        required: true
    },
    natureActivitiesUnderTakenwithNic:{
        type: String,
        required: true
    },
    dateApprovalOffice:{
        type: Date,
        default: Date.now
    },
    validityPeriodTheApproval:{
        type: String,
        required: true
    },
    incomeAndExpendiruteTheLoBo:{
        type: String,
        required: true
    },
    datesOfSubmissionAnnualActivityCertificates:{
        type: String,
        required: true
    },
    natureContraventionsAndReasonsForTheContravention:{
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

podetails = cocConnect.model('podetails', poSchema, 'SF_PO_Details_PO');

module.exports = podetails;