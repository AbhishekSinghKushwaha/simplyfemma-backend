const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const remitanceSchema = new Schema({

    userId: {
        type: String,
        // default : uuidv4(),
    },

    remitanceCode: {
        type: String,
        required: true,
    },


    remitanceDate : {
        type: String,
        default: new Date()
    },

    remitanceMethod : {
        type: String,
        required: true,
    },

    remitanceCategory: {
        type: String,
        required: true,
    },

    remitanceAmount : {
        type: Number,
        required: true,
    },

    remitanceCurrencyType : {
        type: String,
        required: true,
    },

    remitanceCurrentDate : {
        type : String,
        default : new Date()
    }

}, {
    timestamps: true
});

remitanceModel = mongoose.model('remitanceDetails', remitanceSchema, 'SF_Remitance_D')

module.exports = remitanceModel;