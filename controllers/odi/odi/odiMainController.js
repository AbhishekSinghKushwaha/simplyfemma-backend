const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const async = require('async');

const jwt = require("jsonwebtoken");
const odiModel = require("../../../models/odi/odi/odiModel");
const odiCapitalStructureModel = require("../../../models/odi/odi/odiCapitalStructureModel");
const odiJvWosModel = require("../../../models/odi/odi/odiJvWosModel");
const odiPartyFinancialModel = require("../../../models/odi/odi/odiPartyFinancialModel");
const odiSpvInvModel = require("../../../models/odi/odi/odiSpvInvModel");
const odiSpvModel = require("../../../models/odi/odi/odiSpvModel");
const investigationModel = require("../../../models/masterData/investigationModel");
const partyModel = require("../../../models/masterData/partyModel");
const auth = require('../../../middleware/auth')



getOdiData = async (req, res) => {
    let userId = req.params.userid;
    let hiddenResponseVariables = {
        _id: 0,
        "__v": 0,
        "updatedAt": 0,
        "createdAt": 0
    }
    async.series([

            function (callback) {
                odiModel.findOne({
                        userId,
                    },
                    hiddenResponseVariables,
                    callback)
                // callback(new Array(one))
            },

            function (callback) {
                odiCapitalStructureModel.findOne({
                    userId,
                }, hiddenResponseVariables, callback)
            },
            function (callback) {

                odiJvWosModel.findOne({
                    userId,
                }, hiddenResponseVariables, callback)
            },
            function (callback) {
                odiPartyFinancialModel.findOne({
                    userId,
                }, hiddenResponseVariables, callback)
            },
            function (callback) {
                odiSpvInvModel.findOne({
                    userId,
                }, hiddenResponseVariables, callback)
            },
            function (callback) {
                odiSpvModel.findOne({
                    userId,
                }, hiddenResponseVariables, callback)
            },

        ],
        function (err, odiData) {
            // console.log(odiData);
            res.status(200).type('json').send(JSON.stringify({
                odiData,
            }, null, 2));
            if (err) {
                res.status(200).type('json').send(JSON.stringify({
                    err
                }, null, 2));
            }

        });

}

insertOrUpdateOdiData = async (req, res) => {

    let userId = req.params.userid;

    async.series([
            function (callback) {

                odiModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.odiAllDetails.odiDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },

            function (callback) {
                odiCapitalStructureModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.odiAllDetails.odiCapitalStructureDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },
            function (callback) {


                odiJvWosModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.odiAllDetails.odiJvWosDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },

            function (callback) {
                odiPartyFinancialModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.odiAllDetails.odiPartyFinancialDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },
            function (callback) {
                odiSpvInvModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.odiAllDetails.odiSpvInvDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },
            function (callback) {
                odiSpvModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.odiAllDetails.odiSpvDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },

            async function (callback) {
                let jvWosCode = req.body.odiAllDetails.odiJvWosDetails ? req.body.odiAllDetails.odiJvWosDetails.odiJvWosCode : null

                let spvCode = req.body.odiAllDetails.odiSpvDetails ? req.body.odiAllDetails.odiSpvDetails.odiSpvCode : null;

                let capitalStructureCode = req.body.odiAllDetails.odiCapitalStructureDetails ? req.body.odiAllDetails.odiCapitalStructureDetails.odiCapitalStructureCode : null;

                let spvInvDetailCode = req.body.odiAllDetails.odiSpvInvDetails ? req.body.odiAllDetails.odiSpvInvDetails.odiSpvInvCode : null;


                var investigationModelData;
                let fetchedInvestigationAgencyCode;

               await investigationModel.findOne({
                    userId
                }, function (err, data) {
                    investigationModelData = data;
                    fetchedInvestigationAgencyCode = investigationModelData ? investigationModelData.investigationAgencyCode : null;

                });

                var partyModelData;
                let fetchedPartyCode;
                await partyModel.findOne({
                    userId
                }, function (err, data) {
                    partyModelData = data;
                    fetchedPartyCode = partyModelData ? partyModelData.partyCode : null;
                });


                await odiModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: {
                        "odiJvWosCode": jvWosCode,
                        "odiSpvCode": spvCode,
                        "odiCapitalStructureCode": capitalStructureCode,
                        "odiSpvInvDetailCode": spvInvDetailCode,
                        "investigationAgencyCode": fetchedInvestigationAgencyCode,
                        "partyCode": fetchedPartyCode
                    }
                }, {
                    useFindAndModify: false
                }, callback)
            },


        ],
        function (err, results) {
            // console.log(result);
            res.status(200).type('json').send(JSON.stringify({
                results,
                err
            }, null, 2));
            // if (err) {
            //     res.status(200).type('json').send(JSON.stringify({
            //         err
            //     }, null, 2));
            // }

        });

}

router.post("/:userid", (req, res) => {
    insertOrUpdateOdiData(req, res)
})

router.put("/:userid", (req, res) => {
    insertOrUpdateOdiData(req, res)
})

router.get("/:userid", (req, res) => {
    getOdiData(req, res)
})



router.get('/getAlldisinvestmentDetails', (req, res) => {
    odiModel.aggregate([{
                $match: {}
            },
            {
                $lookup: {
                    from: 'SF_disinvestment_M',
                    localField: '_id',
                    foreignField: 'disinvestmentid',
                    as: 'disinvestment',
                },
            },
            {
                $unwind: {
                    path: "$disinvestment",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $sort: {
                    "disinvestment.disinvestmentName": -1
                }
            },
            {
                $group: {
                    "_id": "$_id",
                    "disinvestmentName": {
                        $first: "$disinvestmentName"
                    },
                    "disinvestment": {
                        $first: "$disinvestment"
                    }
                }
            },
            {
                $project: {
                    "_id": 0,
                    "disinvestment Name": "$disinvestmentName",
                    "disinvestment Code": "$client.name",
                    "disinvestment Details": "$client.totalBill"
                }
            }
        ])
        .then(Agencies => {
            res.status(200).type('json').send(JSON.stringify({
                Agencies
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
})

module.exports = router;