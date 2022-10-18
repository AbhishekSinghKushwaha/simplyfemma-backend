const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cocConnect = require('../../dbconnections/cocConnection');

const innerRemittanceSchema = new Schema({
    gr_no: {
        type: String
    },
    purposeGroupName: {
        type: String
    },
    purposeCode: {
        type: String
    },
    description: {
        type: String
    }
});

innerremittance = cocConnect.model('innerremittance', innerRemittanceSchema, 'innerRemittance');

module.exports = innerremittance;