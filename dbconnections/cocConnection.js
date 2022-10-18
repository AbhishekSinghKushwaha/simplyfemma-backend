const mongoose = require('mongoose');
const util = require('util')
const colors = require('colors')
const config = require('../config/config');

mongoose.connect(config.mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    util.log(colors.green("Successfully Connected to MongoDB"));
    
});
mongoose.connection.on('error', (err) => {
    const error = new Error(`unable to connect to db: ${config.mongo.uri} with error: ${err}`);
    util.log(colors.red(error));
});

module.exports = exports = mongoose;