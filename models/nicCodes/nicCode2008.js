const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cocConnect = require('../../dbconnections/cocConnection');

const nicCodes2008Schema  = new Schema({
    subClass: {
        type: String
    },
    class: {
        type: String
    },
    group: {
        type: String
    },
    division: {
        type: String
    },
    section: {
        type: String
    }
});

niccodes2008 = cocConnect.model('niccodes2008',nicCodes2008Schema,'nicCode2008');

module.exports = niccodes2008;