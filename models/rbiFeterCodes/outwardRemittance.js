const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cocConnect = require('../../dbconnections/cocConnection');

const outwardRemittanceSchema = new Schema({
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

outwardremittance = cocConnect.model('outwardremittance', outwardRemittanceSchema, 'outwardRemittance');

module.exports = outwardremittance;