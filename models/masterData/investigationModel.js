const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const investigationSchema = new Schema({
    investigationAgencyCode : {
        type: Number,
        required: true,
    },
    investigationAgencyName: {
        type: String,
        required: true,
    },
    investigationFromDate: {
        type: Date,
        required: true,
    },
    investigationtoDate: {
        type: Date,
        required: true,
    },
    userId : {
        type: String,
 
    }

}, {
    timestamps: true
});

investigationModel = mongoose.model('investigationModel', investigationSchema, 'SF_Investigation_M')

module.exports = investigationModel;