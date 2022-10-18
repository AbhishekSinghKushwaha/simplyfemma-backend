const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cocConnect = require('../../../dbconnections/cocConnection');

const {
    v4: uuidv4
} = require('uuid');

const othersSchema = new Schema({
    userId: {
        type: String,
        default : uuidv4(),
    },
    fdiCode: {
        type: Number,
        required: true
    },
    nameApplicant:{
        type: String,
        required: true
    },
    dateIncorporationothers:{
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
    briefParticularsAboutForeignInvestor:{
        type: String,
        required: true
    },
    detailsForeignInwardRemittancesRecievedByApplicantCompanyFromDateOfIncorporationTillDate:{
        type: String,
        required: true
    },
    copiesBalanceSheetDuringThePeriodOfReceiptOfShareApplicationMoney:{
        type: String,
        required: true
    },
    natureContraventionAndReasonsForTheContravention:{
        type: String,
        required: true
    },
    SlNoTA:{
        type: String,
        required: true
    },
    TAnameRemitter:{
        type: String,
        required: true
    },
    TAtotalamount:{
        type: String,
        required: true
    },
    dateReportingRbiTA:{
        type: Date,
        default: Date.now
    },
    reportrbiTA:{
        type: Date,
        default: Date.now
    },
    TAdelayifany:{
        type: String,
        required: true
    },
    TATotal:{
        type: String,
        required: true
    },
    TBnameofInvestor:{
        type: String,
        required: true
    },
    dateAllotmentOfSharesTB:{
        type: Date,
        default: Date.now
    },
    TBnoSharesAlloted:{
        type: String,
        required: true
    },
    TBamountWhichSharesAlloted:{
        type: String,
        required: true
    },
    dateReportingRBITB:{
        type: Date,
        default: Date.now
    },
    TBdelayifany:{
        type: String,
        required: true
    },
    TBTotal:{
        type: String,
        required: true
    },
    TCSlNo:{
        type: String,
        required: true
    },
    TcnameRemitter:{
        type: String,
        required: true
    },
    TCtotalamountINR:{
        type: String,
        required: true
    },
    dateRecieptTC:{
        type: Date,
        default: Date.now
    },
    TCExcessshareApplicationMoney:{
        type: String,
        required: true
    },
    dateRefundTC:{
        type: Date,
        default: Date.now
    },
    TCamountinForex:{
        type: String,
        required: true
    },
    rbiletterTC:{
        type: Date,
        default: Date.now
    },
    TCTotal:{
        type: String,
        required: true
    },
    ACslNo:{
        type: String,
        required: true
    },
    DateTI:{
        type: Date,
        default: Date.now
    },
    nameACenterAuthorizationCapital:{
        type: String,
        required: true
    },
    ACEffectFrom:{
        type: String,
        required: true
    },
    ACdateBoardMeeting:{
        type: String,
        required: true
    },
    dateFillingROC:{
        type: Date,
        default: Date.now
    },
    currentDate: {
        type: Date,
        default: Date.now
    },

}, {
    timestamps: true
});

othersdetails = cocConnect.model('othersdetails', othersSchema, 'SF_Other_Details_OTHERS');

module.exports = othersdetails;