const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cocConnect = require('../../../dbconnections/cocConnection');

const {
    v4: uuidv4
} = require('uuid');

const ecbSchema = new Schema({
    userId: {
        type: String,
        default : uuidv4(),
    },
    ecbCode: {
        type: Number,
        required: true
    },
    nameApplicant:{
        type: String,
        required: true
    },
    dateIncorporationecb:{
        type: Date,
        default: Date.now
    },
    incometaxPan:{
        type: String,
        required: true
    },
    natureActivitiesUnderTakenNicCode:{
        type: String,
        required: true
    },
    briefParticularsAboutForeignLender:{
        type: String,
        required: true
    },
    ApplicantAnEligibleBorrower:{
        type: String,
        required: true
    },
    LenderEligibleLender:{
        type: String,
        required: true
    },
    LenderAnEquityHolder:{
        type: String,
        required: true
    },
    whatisLevelOfHisHoldingAtTheTimeOfLoanAgreement:{
        type: String,
        required: true
    },
    dateIncorporation2:{
        type: Date,
        default: Date.now
    },
    amountForeign:{
        type: String,
        required: true
    },
    rateInterest:{
        type: String,
        required: true
    },
    periodLoan:{
        type: String,
        required: true
    },
    dateDrawDown:{
        type: Date,
        default: Date.now
    },
    amountForeignCurrency:{
        type: String,
        required: true
    },
    amountInr:{
        type: String,
        required: true
    },
    detailsDrawDown:{
        type: String,
        required: true
    },
    detailsLRNno:{
        type: String,
        required: true
    },
    detailsEcb2returnsSubmittedandPeriodOfReturnandDateOfSubmission:{
        type: String,
        required: true
    },
    detailsUtilizationOfEcbInForeignCurrencyAndIndianRupee:{
        type: String,
        required: true
    },
    natureContraventionandReasonsForTheContravention:{
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

ecbdetails = cocConnect.model('ecbdetails', ecbSchema, 'SF_ECB_Details_ECB');

module.exports = ecbdetails;