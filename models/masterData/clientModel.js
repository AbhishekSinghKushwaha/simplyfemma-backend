const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const action = new Schema({
    type: {
        type: String
    },
    amount: {
        type: Number
    },
}, {
    timestamps: true
});


const clientSchema = new Schema({
    bankId: {
        type: Schema.Types.ObjectId,
        ref: 'SF_BANK_M',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        // unique: false
    },

    userId : {
        type: String,
 
    }

}, {
    timestamps: true
});


clientModel = mongoose.model('clientModel', clientSchema, 'client');

module.exports = clientModel;