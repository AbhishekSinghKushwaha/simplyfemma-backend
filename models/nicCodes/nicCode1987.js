const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cocConnect = require('../../dbconnections/cocConnection');

const nicCodes1987Schema  = new Schema({
    description: {
        type: String
    },
    section: {
        type: String
    }
});

niccodes1987 = cocConnect.model('niccodes1987',nicCodes1987Schema,'nicCode1987');

module.exports = niccodes1987;