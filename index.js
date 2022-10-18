const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const util = require('util')
const colors = require('colors')
const app = express();
const connectStore = require("connect-mongo");
const morgan = require('morgan');
const authController = require('./controllers/authController')
const session = require("express-session");
// const MongoStore = connectStore(session);
/**
 * Master Data Controller
 */
const bankController = require('./controllers/masterData/bankController')
const partyController = require('./controllers/masterData/partyController')
const investmentTypeController = require('./controllers/masterData/investmentTypeController')
const investigationController = require('./controllers/masterData/investigationController')
const officeDetailsController = require('./controllers/masterData/officeDetailsController')
const masterDataController = require('./controllers/masterData/mainController')

/**
 * ODI Controllers 
 */
const odiSpvController = require('./controllers/odi/odi/odiSpvController')
const odiSpvInvController = require('./controllers/odi/odi/odiSpvInvController')
const odiController = require('./controllers/odi/odi/odiController')
const odiPartyFinancialController = require('./controllers/odi/odi/odiPartyFinancialController')
const odiJvWosController = require('./controllers/odi/odi/odiJvWosController')
const odiCapitalStructureController = require('./controllers/odi/odi/odiCapitalStructureController')

const odiMainController = require('./controllers/odi/odi/odiMainController')

/** Disinvestment Controller */
const disinvestmentController = require('./controllers/odi/disinvestment/disinvestmentController')
const cummulativeDirectInvestmentController = require('./controllers/odi/disinvestment/cummulativeDirectInvestmentController')
const receivingPartyController = require('./controllers/odi/disinvestment/receivingPartyController')
const remitanceController = require('./controllers/odi/disinvestment/remitanceController')
const disinvestmentMainController = require('./controllers/odi/disinvestment/disinvestmentMainController')


/** Annual Performance Report Controller */
const aprController = require('./controllers/odi/apr/aprController')
const aprCapOpsController = require('./controllers/odi/apr/aprCapOpsController')
const aprCapStructureController = require('./controllers/odi/apr/aprCapStructureController')
const aprInvestmentSdsController = require('./controllers/odi/apr/aprInvestmentSdsController')
const aprRepatriationController = require('./controllers/odi/apr/aprRepatriationController')
const aprMainController = require('./controllers/odi/apr/aprMainController')


/**
 * User Controller
 */
const userController = require('./controllers/userController')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
'';

// NicCode Controller
const nicCodeController = require('./controllers/nicCodes/nicCodeController');
const nicCode1987Controller = require('./controllers/nicCodes/nicCode1987Controller');
const nicCode2008Controller = require('./controllers/nicCodes/nicCode2008Controller');

// NicCode Regex Controller
const nicCodeRegexController = require('./controllers/nicCodes/nicCodesRegex/nicCodeRegex');
const nicCode1987RegexController = require('./controllers/nicCodes/nicCodesRegex/nicCode1987Regex');
const nicCode2008RegexController = require('./controllers/nicCodes/nicCodesRegex/nicCode2008Regex');

// RBI Feter Codes Controller
const innerRemittanceController = require('./controllers/rbiFeterCodes/innerRemittanceController');
const outwardRemittanceController = require('./controllers/rbiFeterCodes/outwardRemittanceController');
const lrsController = require('./controllers/rbiFeterCodes/lrsController');

// RBI Feter Codes Regex Controller
const innerRemittanceRegexController = require('./controllers/rbiFeterCodes/rbiFeterCodesRegex/innerRemittanceRegex');
const outwardRemittanceRegexController = require('./controllers/rbiFeterCodes/rbiFeterCodesRegex/outwardRemittanceRegex');
const lrsRegexController = require('./controllers/rbiFeterCodes/rbiFeterCodesRegex/lrsRegex');

// COC - FDI Controller
const fdientityDetailsController = require('./controllers/coc/fdi/entityDetailsController');
const fdicompoundingDetailsController = require('./controllers/coc/fdi/compoundingDetailsController');
const fdicompoundingSubmissionsController = require('./controllers/coc/fdi/compoundingSubmissionController');
const fdiController = require('./controllers/coc/fdi/fdiController');
const fdiannexuresController = require('./controllers/coc/fdi/annexureController');
const fdiauthorisedSignatoryController = require('./controllers/coc/fdi/authorisedSignatoryController');
const fdimainController = require('./controllers/coc/fdi/fdimainController');

// COC - ODI Controller
const odientityDetailsController = require('./controllers/coc/odi/entityDetailsController');
const odicompoundingDetailsController = require('./controllers/coc/odi/compoundingDetailsController');
const odicompoundingSubmissionsController = require('./controllers/coc/odi/compoundingSubmissionController');
const odiodiController = require('./controllers/coc/odi/odiController');
const odiannexuresController = require('./controllers/coc/odi/annexureController');
const odiauthorisedSignatoryController = require('./controllers/coc/odi/authorisedSignatoryController');
const odimainController = require('./controllers/coc/odi/odimainController');

// COC - ECB Controller
const ecbentityDetailsController = require('./controllers/coc/ecb/entityDetailsController');
const ecbcompoundingDetailsController = require('./controllers/coc/ecb/compoundingDetailsController');
const ecbcompoundingSubmissionsController = require('./controllers/coc/ecb/compoundingSubmissionController');
const ecbecbController = require('./controllers/coc/ecb/ecbController');
const ecbannexuresController = require('./controllers/coc/ecb/annexureController');
const ecbauthorisedSignatoryController = require('./controllers/coc/ecb/authorisedSignatoryController');
const ecbmainController = require('./controllers/coc/ecb/ecbmainController');

// COC - BO Controller
const boentityDetailsController = require('./controllers/coc/bo/entityDetailsController');
const bocompoundingDetailsController = require('./controllers/coc/bo/compoundingDetailsController');
const bocompoundingSubmissionsController = require('./controllers/coc/bo/compoundingSubmissionController');
const boboController = require('./controllers/coc/bo/boController');
const boannexuresController = require('./controllers/coc/bo/annexureController');
const boauthorisedSignatoryController = require('./controllers/coc/bo/authorisedSignatoryController');
const bomainController = require('./controllers/coc/bo/bomainController');

// COC - PO Controller
const poentityDetailsController = require('./controllers/coc/po/entityDetailsController');
const pocompoundingDetailsController = require('./controllers/coc/po/compoundingDetailsController');
const pocompoundingSubmissionsController = require('./controllers/coc/po/compoundingSubmissionController');
const popoController = require('./controllers/coc/po/poController');
const poannexuresController = require('./controllers/coc/po/annexureController');
const poauthorisedSignatoryController = require('./controllers/coc/po/authorisedSignatoryController');
const pomainController = require('./controllers/coc/po/pomainController');

// COC - LO Controller
const loentityDetailsController = require('./controllers/coc/lo/entityDetailsController');
const locompoundingDetailsController = require('./controllers/coc/lo/compoundingDetailsController');
const locompoundingSubmissionsController = require('./controllers/coc/lo/compoundingSubmissionController');
const loloController = require('./controllers/coc/lo/loController');
const loannexuresController = require('./controllers/coc/lo/annexureController');
const loauthorisedSignatoryController = require('./controllers/coc/lo/authorisedSignatoryController');
const lomainController = require('./controllers/coc/lo/lomainController');

// COC - Others Controller
const othersentityDetailsController = require('./controllers/coc/others/entityDetailsController');
const otherscompoundingDetailsController = require('./controllers/coc/others/compoundingDetailsController');
const otherscompoundingSubmissionsController = require('./controllers/coc/others/compoundingSubmissionController');
const othersothersController = require('./controllers/coc/others/othersController');
const othersannexuresController = require('./controllers/coc/others/annexureController');
const othersauthorisedSignatoryController = require('./controllers/coc/others/authorisedSignatoryController');
const othersmainController = require('./controllers/coc/others/othersmainController');


app.disable('x-powered-by');

app.use( express.json({limit: '50mb'}) );
app.use(express.urlencoded({
    limit: '50mb', 
    extended: true,
    parameterLimit:50000 
}));
app.use(express.json());
app.use(cookieParser());
app.use(compress());

app.use(helmet());


app.use(
    cors({
        exposedHeaders: ['x-auth-header'],
    }),
);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// app.use('/api/v1', SwaggerAPIRouter);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.Promise = Promise;

// mongoose.connect(config.mongo.uri, {
//     //useNewUrlParser: true,
//     //useUnifiedTopology: true,
// }).then(() => {
//     util.log(colors.green("Successfully Connected to MongoDB"));
    
// });
// mongoose.connection.on('error', (err) => {
//     const error = new Error(`unable to connect to db: ${config.mongo.uri} with error: ${err}`);
//     util.log(colors.red(error));
// });

// app.use(morgan('dev'));
app.use('/fdi/entitydetails',fdientityDetailsController);
app.use('/fdi/compoundingdetails',fdicompoundingDetailsController);
app.use('/fdi/compoundingsubmissiondetails',fdicompoundingSubmissionsController);
app.use('/fdi/fdidetails',fdiController);
app.use('/fdi/annexuresdetails',fdiannexuresController);
app.use('/fdi/authorisedsignatorydetails',fdiauthorisedSignatoryController);
app.use('/coc/fdi/alldata',fdimainController);

app.use('/odi/entitydetails',odientityDetailsController);
app.use('/odi/compoundingdetails',odicompoundingDetailsController);
app.use('/odi/compoundingsubmissiondetails',odicompoundingSubmissionsController);
app.use('/odi/odidetails',odiodiController);
app.use('/odi/annexuresdetails',odiannexuresController);
app.use('/odi/authorisedsignatorydetails',odiauthorisedSignatoryController);
app.use('/coc/odi/alldata',odimainController);

app.use('/ecb/entitydetails',ecbentityDetailsController);
app.use('/ecb/compoundingdetails',ecbcompoundingDetailsController);
app.use('/ecb/compoundingsubmissiondetails',ecbcompoundingSubmissionsController);
app.use('/ecb/ecbdetails',ecbecbController);
app.use('/ecb/annexuresdetails',ecbannexuresController);
app.use('/ecb/authorisedsignatorydetails',ecbauthorisedSignatoryController);
app.use('/coc/ecb/alldata',ecbmainController);

app.use('/bo/entitydetails',boentityDetailsController);
app.use('/bo/compoundingdetails',bocompoundingDetailsController);
app.use('/bo/compoundingsubmissiondetails',bocompoundingSubmissionsController);
app.use('/bo/bodetails',boboController);
app.use('/bo/annexuresdetails',boannexuresController);
app.use('/bo/authorisedsignatorydetails',boauthorisedSignatoryController);
app.use('/coc/bo/alldata',bomainController);

app.use('/lo/entitydetails',loentityDetailsController);
app.use('/lo/compoundingdetails',locompoundingDetailsController);
app.use('/lo/compoundingsubmissiondetails',locompoundingSubmissionsController);
app.use('/lo/lodetails',loloController);
app.use('/lo/annexuresdetails',loannexuresController);
app.use('/lo/authorisedsignatorydetails',loauthorisedSignatoryController);
app.use('/coc/lo/alldata',lomainController);

app.use('/po/entitydetails',poentityDetailsController);
app.use('/po/compoundingdetails',pocompoundingDetailsController);
app.use('/po/compoundingsubmissiondetails',pocompoundingSubmissionsController);
app.use('/po/podetails',popoController);
app.use('/po/annexuresdetails',poannexuresController);
app.use('/po/authorisedsignatorydetails',poauthorisedSignatoryController);
app.use('/coc/po/alldata',pomainController);

app.use('/others/entitydetails',othersentityDetailsController);
app.use('/others/compoundingdetails',otherscompoundingDetailsController);
app.use('/others/compoundingsubmissiondetails',otherscompoundingSubmissionsController);
app.use('/others/othersdetails',othersothersController);
app.use('/others/annexuresdetails',othersannexuresController);
app.use('/others/authorisedsignatorydetails',othersauthorisedSignatoryController);
app.use('/coc/others/alldata',othersmainController);

app.use('/niccode',nicCodeController);
app.use('/niccode1987',nicCode1987Controller);
app.use('/niccode2008',nicCode2008Controller);

app.use('/niccode',nicCodeRegexController);
app.use('/niccode1987',nicCode1987RegexController);
app.use('/niccode2008',nicCode2008RegexController);

app.use('/innerremittance', innerRemittanceController);
app.use('/outwardremittance', outwardRemittanceController);
app.use('/lrs', lrsController);

app.use('/innerremittance', innerRemittanceRegexController);
app.use('/outwardremittance', outwardRemittanceRegexController);
app.use('/lrs', lrsRegexController);

app.use('/auth', authController);


app.use('/masterdata/bank', bankController);
app.use('/masterdata/investment', investmentTypeController);
app.use('/masterdata/party', partyController);
app.use('/masterdata/investigation', investigationController);
app.use('/masterdata/officedetails', officeDetailsController);
app.use('/masterdata/alldata', masterDataController);

app.use('/odi/disinvestment', disinvestmentController)
app.use('/odi/cdi', cummulativeDirectInvestmentController)
app.use('/odi/receivingparty', receivingPartyController)
app.use('/odi/remitance', remitanceController)
app.use('/odi/disinvestment/alldata/', disinvestmentMainController)


app.use('/odi/apr', aprController)
app.use('/odi/aprcapops', aprCapOpsController)
app.use('/odi/aprrepatriation', aprRepatriationController)
app.use('/odi/aprinvestmentsds', aprInvestmentSdsController)
app.use('/odi/aprcapstructure', aprCapStructureController)
app.use('/odi/apr/alldata', aprMainController)


app.use('/odi/odi', odiController)
app.use('/odi/odicapitalstructure', odiCapitalStructureController)
app.use('/odi/odijvwos', odiJvWosController)
app.use('/odi/odipartyfinancial', odiPartyFinancialController)
app.use('/odi/odispv', odiSpvController)
app.use('/odi/odispvinv', odiSpvInvController)
app.use('/odi/odi/alldata', odiMainController)


app.use('/user', userController);

// app.use(session({
//     name: config.SESS_NAME,
//     secret: config.SESS_SECRET,
//     resave: true,
//     saveUninitialized: true,
//     store: new MongoStore({
//         mongooseConnection: mongoose.connection,
//         collection: 'session',
//         ttl: parseInt(config.SESS_LIFETIME) / 1000,
//     }),
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         sameSite: true,
//         secure: config.env === 'production',
//         maxAge: parseInt(config.SESS_LIFETIME),

//     },

// }));

// app.use('/register', userController)
// app.use('/login', userController.login)
// app.use('/logout', userController.logout)

// Profile ralted route
// router.get('/profile/:username', userController.ifUserExists, userController.profilePostsScreen)

// post related routes
// app.use('/create-post', userController.mustLog, postController.viewCreateScreen)
// app.use('/create-post', userController.mustLog, postController.create )
// router.get('/post/:id', postController.viewSingle)
// app.use('/', router);

app.use((req, res, next) => {
    const error = new Error('Wrong Path');
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

const port = process.env.PORT || 4001;


app.listen(port, () => {
    util.log(colors.green(`API Server started at Port: ${port}`));
});
