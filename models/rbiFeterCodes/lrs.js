const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cocConnect = require('../../dbconnections/cocConnection');

const lrsSchema = new Schema({
    purposeCode: {
        type: String
    },
    description: {
        type: String
    }
});

lrs = cocConnect.model('lrs', lrsSchema, 'lrs');

module.exports = lrs;