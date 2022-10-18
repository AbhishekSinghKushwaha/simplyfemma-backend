const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const cocConnect = require('../../../dbconnections/cocConnection');

var cinValidator = [
    validate({
      validator: 'isLength',
      arguments: [1, 21],
      message: 'CIN NO should be 21 characters'
    })
];
var panValidator = [
    validate({
      validator: 'isLength',
      arguments: [1, 10],
      message: 'PAN NO should be 10 characters'
    })
  ];

const Schema = mongoose.Schema;
const {
    v4: uuidv4
} = require('uuid');
const { application } = require('express');

const boentitySchema = new Schema({
        userId: {
            type: String,
            default : uuidv4()
        },
        entityCode:{
            type: Number,
            required: true,
            //index: true
        },
        legalNameBusiness: {
            type: String,
            required: true
        },
        dateIncorporation: {
            type: Date,
            default: Date.now,
            required: true
        },
        cinNumber: {
            type: String,
            required: true,
            validate: cinValidator
        },
        panNumber: {
            type: String,
            required: true,
            validate: panValidator
        },
        selectnicOption: {
            type: String,
            required: true
        },
        mainactivities: {
            type: String,
            required: true
        },
        additionalactivities: {
            type: String,
            required: true
        },
        selectactivityOption: {
            type: String,
            required: true
        },
        buildingNo: {
            type: String,
            required: true
        },
        floorNo:{
            type: String,
            required: true
        },
        nameThePremisesOrBuilding: {
            type: String,
            required: true
        },
        Street: {
            type: String,
            required: true
        },
        Area: {
            type: String,
            required: true
        },
        City: {
            type: String,
            required: true
        },
        State: {
            type: String,
            required:    true
        },
        Country: {
            type: String,
            required: true
        },
        Pincode: {
            type: String,
            required: true
        },
        officeemailAddress:{
            type: String,
            required: true
        },
        mobileNo: {
            type: String,
            required: true
        },
        officeTelephoneNo: {
            type: String,
            required: true
        },
        officeFaxNo: {
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

boentitySchema.index({ userId : 1});

const boentitydetails  = cocConnect.model('boentitydetails', boentitySchema, 'SF_Entity_Details_BO');

// applicationdetails.collection.createIndex({ applicantCode : 1 }); 
// applicationdetails.syncIndexes();

module.exports = boentitydetails;