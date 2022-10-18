const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const userSchema = new Schema({



    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    },

    phoneNumber: {
        type: Number,
        required: true,
    },

    companyName : {
        type: String,
    },

    userRole : {
        type: String,
        default :'user'
    },

    userId : {
        type : String,
        default : () => uuidv4() 
    }
    

}, {
    timestamps: true
});

userModel = mongoose.model('userModel', userSchema, 'users')

module.exports = userModel;