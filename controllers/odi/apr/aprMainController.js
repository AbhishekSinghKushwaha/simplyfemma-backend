const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const async = require('async');

const jwt = require("jsonwebtoken");
const aprModel = require("../../../models/odi/apr/aprModel");
const aprCapOpsModel = require("../../../models/odi/apr/aprCapOpsModel");
const aprCapStructureModel = require("../../../models/odi/apr/aprCapStructureModel");
const aprInvestmentSdsModel = require("../../../models/odi/apr/aprInvestmentSdsModel");
const aprRepatriationModel = require("../../../models/odi/apr/aprRepatriationModel");
const auth = require('../../../middleware/auth')
const partyModel = require("../../../models/masterData/partyModel");

getAprData = async (req, res) => {
    let userId = req.params.userid;
    let hiddenResponseVariables = {
        _id: 0,
        "__v": 0,
        "updatedAt": 0,
        "createdAt": 0
    }
    async.series([

            function (callback) {
                aprModel.findOne({
                        userId,
                    },
                    hiddenResponseVariables,
                    callback)
                // callback(new Array(one))
            },

            function (callback) {
                aprCapOpsModel.findOne({
                    userId,
                }, hiddenResponseVariables, callback)
            },
            function (callback) {

                aprCapStructureModel.findOne({
                    userId,
                }, hiddenResponseVariables, callback)
            },
            function (callback) {
                aprInvestmentSdsModel.findOne({
                    userId,
                }, hiddenResponseVariables, callback)
            },
            function (callback) {
                aprRepatriationModel.findOne({
                    userId,
                }, hiddenResponseVariables, callback)
            },

        ],
        function (err, aprData) {
            // console.log(aprData);
            res.status(200).type('json').send(JSON.stringify({
                aprData,
            }, null, 2));
            if (err) {
                res.status(200).type('json').send(JSON.stringify({
                    err
                }, null, 2));
            }

        });

}

insertOrUpdateAprData = async (req, res) => {

    let userId = req.params.userid;
    async.series([
            function (callback) {
                aprModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.aprAllDetails.aprDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },

            function (callback) {

                aprCapOpsModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.aprAllDetails.aprCapOpsDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },
            function (callback) {

                aprCapStructureModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.aprAllDetails.aprCapStructureDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },
            function (callback) {
                aprInvestmentSdsModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.aprAllDetails.aprInvestmentSdsDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },
            function (callback) {
                aprRepatriationModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.aprAllDetails.aprRepatriationDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },
            async function (callback) {
                let repatriationDetailCode = req.body.aprAllDetails.aprRepatriationDetails ? req.body.aprAllDetails.aprRepatriationDetails.aprRepatriationCode : null

                let opsDetailCode = req.body.aprAllDetails.aprCapOpsDetails ? req.body.aprAllDetails.aprCapOpsDetails.aprCapOpsCode : null;

                let aprCapitalStructureCode = req.body.aprAllDetails.aprCapStructureDetails ? req.body.aprAllDetails.aprCapStructureDetails.aprCapStructureCode : null;

                let investmentSDSDetailCode = req.body.aprAllDetails.aprInvestmentSdsDetails ? req.body.aprAllDetails.aprInvestmentSdsDetails.aprInvestmentSdsCode : null;


                let fetchedPartyCode;
                await partyModel.findOne({
                    userId
                }, function (err, partyModelData) {
                    fetchedPartyCode = partyModelData ? partyModelData.partyCode : null;
                });


                await aprModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: {
                        "aprInvestmentSDSDetailCode": investmentSDSDetailCode,
                        "aprCapStructureCode": aprCapitalStructureCode,
                        "aprOpsDetailCode": opsDetailCode,
                        "aprRepatriationDetailCode": repatriationDetailCode,
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
    insertOrUpdateAprData(req, res)
})

router.put("/:userid", (req, res) => {
    insertOrUpdateAprData(req, res)
})

router.get("/:userid", (req, res) => {
    getAprData(req, res)
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