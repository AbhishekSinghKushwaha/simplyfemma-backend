const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cocConnect = require('../../dbconnections/cocConnection');

const nicCodesSchema  = new Schema({
    policy: {
        type: String
    },
    sector: {
        type: String
    },
    equity: {
        type: String
    },
    entryRoute: {
        type: String
    },
    otherConditions: {
        type: String
    },
    nic: {
        type: String
    }
});

niccodes = cocConnect.model('niccodes', nicCodesSchema, 'nicCode');

module.exports = niccodes;