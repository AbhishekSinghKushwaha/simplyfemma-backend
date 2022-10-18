const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
    v4: uuidv4
} = require('uuid');

const aprCapStructureSchema = new Schema({


    userId: {
        type: String,
        // default: uuidv4()
    },

    aprCapStructureCode: {
        type: Number,
        required: true,
    },
    aprCapPartyName: {
        type: String,
        required: true,
    },
    aprCapPartyType: {
        type: String,
        required: true,
    },
    aprCapPartyPct: {
        type: Number,
        required: true,
    },
    aprCapPartyAmount: {
        type: Number,
        required: true,
    },
    aprCapCurrentDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true
});

aprCapStructureModel = mongoose.model('aprCapStructureModel', aprCapStructureSchema, 'SF_APR_Cap_Structure_D')

module.exports = aprCapStructureModel;