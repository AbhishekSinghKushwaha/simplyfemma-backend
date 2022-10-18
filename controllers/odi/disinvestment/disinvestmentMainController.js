const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const async = require('async');

const jwt = require("jsonwebtoken");
const disinvestmentModel = require("../../../models/odi/disinvestment/disinvestmentModel");
const cummulativeDirectInvestmentModel = require("../../../models/odi/disinvestment/cummulativeDirectInvestmentModel");
const receivingPartyModel = require("../../../models/odi/disinvestment/receivingPartyModel");
const remitanceModel = require("../../../models/odi/disinvestment/remitanceModel");
const auth = require('../../../middleware/auth')
const bankModel = require("../../../models/masterData/bankModel");
const partyModel = require("../../../models/masterData/partyModel");

getDisinvestmentData = async (req, res) => {
    let userId = req.params.userid;
    let hiddenResponseVariables = {
        _id: 0,
        "__v": 0,
        "updatedAt": 0,
        "createdAt": 0
    }
    async.series([

            function (callback) {
                disinvestmentModel.findOne({
                        userId,
                    },
                    hiddenResponseVariables,
                    callback)

            },

            function (callback) {
                cummulativeDirectInvestmentModel.findOne({
                    userId,
                }, hiddenResponseVariables, callback)
            },
            function (callback) {

                remitanceModel.findOne({
                    userId,
                }, hiddenResponseVariables, callback)
            },
            function (callback) {
                receivingPartyModel.findOne({
                    userId,
                }, hiddenResponseVariables, callback)
            }

        ],
        function (err, disinvestmentData) {
            // console.log(disinvestmentData);
            res.status(200).type('json').send(JSON.stringify({
                disinvestmentData,
            }, null, 2));
            if (err) {
                res.status(200).type('json').send(JSON.stringify({
                    err
                }, null, 2));
            }

        });

}

insertOrUpdateDisinvestmentData = async (req, res) => {

    let userId = req.params.userid;
    async.series([
            function (callback) {
                disinvestmentModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.disinvestmentAllDetails.disinvestmentDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },

            function (callback) {

                receivingPartyModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.disinvestmentAllDetails.receivingPartyDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },
            function (callback) {

                remitanceModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.disinvestmentAllDetails.remitanceDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },
            function (callback) {
                cummulativeDirectInvestmentModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.disinvestmentAllDetails.cummulativeDirectInvestmentDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },
            async function (callback) {
                let remitanceCode = req.body.disinvestmentAllDetails.remitanceDetails ? req.body.disinvestmentAllDetails.remitanceDetails.remitanceCode : null

                let cummulativeDirectInvCode = req.body.disinvestmentAllDetails.cummulativeDirectInvestmentDetails ? req.body.disinvestmentAllDetails.cummulativeDirectInvestmentDetails.cummulativeDirectInvestmentCode : null;

                let receivingPartyName = req.body.disinvestmentAllDetails.receivingPartyDetails ? req.body.disinvestmentAllDetails.receivingPartyDetails.receivingPartyName : null;

                let fetchedPartyCode;
                await partyModel.findOne({
                    userId
                }, function (err, partyModelData) {
                    fetchedPartyCode = partyModelData ? partyModelData.partyCode : null;
                });

                let fetchedBankCode;
                await bankModel.findOne({
                    userId
                }, function (err, bankModelData) {
                    fetchedBankCode = bankModelData ? bankModelData.bankCode : null;
                });


                await disinvestmentModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: {
                        "disInvestmentBankcode": fetchedBankCode,    
                        "disInvestmentPartyCode": fetchedPartyCode,
                        "disInvestmentReceivingPartyName": receivingPartyName,
                        "disInvestmentCumulativeDirectInvCode": cummulativeDirectInvCode,
                        "disInvestmentRemitanceDetailCode": remitanceCode,
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
    insertOrUpdateDisinvestmentData(req, res)
})

router.put("/:userid", (req, res) => {
    insertOrUpdateDisinvestmentData(req, res)
})

router.get("/:userid", (req, res) => {
    getDisinvestmentData(req, res)
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