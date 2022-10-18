const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cocConnect = require('../../../dbconnections/cocConnection');

const {
    v4: uuidv4
} = require('uuid');

const loannexuresSchema = new Schema({
    userId: {
        type: String,
        default : uuidv4(),
    },
    annexuresCode: {
        type: Number,
        required: true
    },
    annexureCheckbox1:{
        type: Boolean,
        required: true
    },
    annexureCheckbox2:{
        type: Boolean,
        required: true
    },
    annexureCheckbox3:{
        type: Boolean,
        required: true
    },
    annexureCheckbox4:{
        type: Boolean,
        required: true
    },
    annexureCheckbox5:{
        type: Boolean,
        required: true
    },
    annexureCheckbox6:{
        type: Boolean,
        required: true
    },
    annexureCheckbox7:{
        type: Boolean,
        required: true
    },
    annexureCheckbox8:{
        type: Boolean,
        required: true
    },
    annexureCheckbox9:{
        type: Boolean,
        required: true
    },
    annexureCheckbox10:{
        type: Boolean,
        required: true
    },
    annexureCheckbox11:{
        type: Boolean,
        required: true
    },
    selectAnnexure1:{
        type: String,
        required: true
    },
    selectAnnexure2:{
        type: String,
        required: true
    },
    selectAnnexure3:{
        type: String,
        required: true
    },
    selectAnnexure4:{
        type: String,
        required: true
    },
    selectAnnexure5:{
        type: String,
        required: true
    },
    selectAnnexure6:{
        type: String,
        required: true
    },
    selectAnnexure7:{
        type: String,
        required: true
    },
    selectAnnexure8:{
        type: String,
        required: true
    },
    selectAnnexure9:{
        type: String,
        required: true
    },
    selectAnnexure10:{
        type: String,
        required: true
    },
    selectAnnexure11:{
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

loannexures = cocConnect.model('loannexures', loannexuresSchema, 'SF_Annexures_lO');

module.exports = loannexures;