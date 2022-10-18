const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cocConnect = require('../../../dbconnections/cocConnection');

const {
    v4: uuidv4
} = require('uuid');

const bocompoundingSchema = new Schema({
    userId: {
        type: String,
        default : uuidv4(),
    },
    compoundingCode: {
        type: Number,
        required: true
    },
    natureContravention:{
        type: String,
        required: true
    },
    selectFema: {
        type: String,
        required: true
    },
    selectRegulationNo: {
        type: Number,
        required: true
    },
    topicNameDescription: [{
        type: String,
        required: true
    }],
    sampleOthers: [{
        type: Map,
        of: Boolean,
    }],
    selectCAAoption: {
        type: String,
        required: true
    },
    selectcentralOptions:{
        type: String,
        required: true
    },
    subjectCompounding: {
        type: String,
        required: true
    },
    sample_subjectOfCompounding_1:{
        type: Boolean
    },
    sample_subjectOfCompounding_2:{
        type: Boolean
    },
    sample_subjectOfCompounding_3:{
        type: Boolean
    },
    rbiReferenceLetter: [{
        type: String,
        required: true
    }],
    sampleRbi: [{
        type: Map,
        of: Boolean,
    }],
    residentoutsideIndia: {
        type: String,
        default: 'India',
        required: true
    },
    sample_indiaOrNot_1:{
        type: Boolean
    },
    sample_indiaOrNot_2:{
        type: Boolean
    },
    sample_indiaOrNot_3:{
        type: Boolean
    },
    nameAdjudicatingAuthority: {
        type: String,
        required: true
    },
    compoundingApplicationfee: {
        type: String,
        default: 5000,
        required: true
    },
    dateIncorporationmod2: {
        type: Date,
        default: Date.now,
        required: true
    },
    inFavour: {
        type: String,
        required: true
    },
    officeTeleNo: {
        type: String,
        required: true
    },
    selectpayOption:{
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

bocompoundingSchema.index({userId: 1});

bocompoundingdetails = cocConnect.model('bocompoundingdetails', bocompoundingSchema, 'SF_Compounding_Details_BO');

module.exports = bocompoundingdetails;