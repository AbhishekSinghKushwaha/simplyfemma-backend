const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
    v4: uuidv4
} = require('uuid');

const odiJvWosSchema = new Schema({

    userId: {
        type: String,
        // default : uuidv4(),
    },


    odiJvWosCode: {
        type: Number,
        required: true
    },
    odiJvWosIPName: {
        type: String,
        required: true
    },
    odiJvWosUID: {
        type: String,
        required: true
    },
    odiJvWosADBank: {
        type: String,
        required: true
    },
    odiJvWosName: {
        type: String,
        required: true
    },
    odiJvWosAddress: {
        type: String,
        required: true
    },
    odiJvWosCountry: {
        type: String,
        required: true
    },
    odiJvWosEmail: {
        type: String,
        required: true
    },
    currentDate: {
        type: Date,
        required: true
    },

}, {
    timestamps: true
});

odiJvWosModel = mongoose.model('odiJvWosModel', odiJvWosSchema, 'SF_ODI_JvWos_Detail')

module.exports = odiJvWosModel;