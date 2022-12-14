const Joi = require('joi');
require('dotenv').config();

const SESS_NAME = 'sid';
const SESS_SECRET = 'secret!session';
const SESS_LIFETIME = 1000 * 60 * 60 * 2


const envVarsSchema = Joi.object({
        NODE_ENV: Joi.string()
            .allow([`development`, `test`, `production`])
            .default('development'),
        PORT: Joi.number()
            .description('Server PORT')
            .default(8080),
        MONGO_HOST: Joi.string().required()
            .description('Mongo DB host url'),
        MONGO_PORT: Joi.number()
            .default(27017),
        MONGO_DB: Joi.string()
            .default("assignment"),
        MONGO_DB_USER: Joi.string().required()
            .description('Mongo DB username'),
        MONGO_DB_PASS: Joi.string().required()
            .description('Mongo DB password')
    }).unknown()
    .required();

    
const {
    error,
    value: envVars
} = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`config validation error: ${error.message}`);
}

// const config = {
//     env: envVars.NODE_ENV,
//     port: envVars.PORT,
//     mongo: {
//         uri: "mongodb+srv://" + envVars.MONGO_DB_USER + ":" + encodeURIComponent(envVars.MONGO_DB_PASS) +
//             "@" + envVars.MONGO_HOST +"/" + envVars.MONGO_DB +"?retryWrites=true&w=majority"
//     },
//     jwtSecret: "jwtsecretkey"
// };

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongo: {
        uri: "mongodb://" + envVars.MONGO_DB_USER + ":" + encodeURIComponent(envVars.MONGO_DB_PASS) +
            "@" + envVars.MONGO_HOST +"/" + envVars.MONGO_DB
    },
    jwtSecret: "jwtsecretkey"
};

 
module.exports = config
 
