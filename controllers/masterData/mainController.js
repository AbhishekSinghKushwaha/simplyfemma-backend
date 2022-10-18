const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const async = require('async');

const jwt = require("jsonwebtoken");
const bankModel = require("../../models/masterData/bankModel");
const investigationModel = require("../../models/masterData/investigationModel");
const investmentModel = require("../../models/masterData/investmentModel");
const partyModel = require("../../models/masterData/partyModel");
const officeDetailsModel = require("../../models/masterData/officeDetailsModel");
const auth = require('../../middleware/auth')


getUserMasterData = async (req, res) => {
    let userId = req.params.userid;
    let hiddenResponseVariables = {
        _id: 0,
        "__v": 0,
        "updatedAt": 0,
        "createdAt": 0
    }
    async.series([

            function (callback) {
                bankModel.findOne({
                        userId,
                    },
                    hiddenResponseVariables,
                    callback)

            },

            function (callback) {
                investigationModel.findOne({
                    userId,
                }, hiddenResponseVariables, callback)
            },
            function (callback) {

                investmentModel.findOne({
                    userId,
                }, hiddenResponseVariables, callback)
            },
            function (callback) {
                partyModel.findOne({
                    userId,
                }, hiddenResponseVariables, callback)
            },
            function (callback) {
                officeDetailsModel.findOne({
                    userId,
                }, hiddenResponseVariables, callback)
            }

        ],
        function (err, userMasterData) {
            // console.log(disinvestmentData);
            res.status(200).type('json').send(JSON.stringify({
                userMasterData,
            }, null, 2));
            if (err) {
                res.status(200).type('json').send(JSON.stringify({
                    err
                }, null, 2));
            }

        });

}

insertOrUpdateUserMasterData = async (req, res) => {

    let userId = req.params.userid;
    async.series([
            function (callback) {
                bankModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.userMasterDataAllDetails.bankDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },

            function (callback) {

                investigationModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.userMasterDataAllDetails.investigationDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },
            function (callback) {

                investmentModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.userMasterDataAllDetails.investmentDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },
            function (callback) {
                partyModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.userMasterDataAllDetails.partyDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            },
            function (callback) {

                officeDetailsModel.findOneAndUpdate({
                    userId,
                }, {
                    $set: req.body.userMasterDataAllDetails.officeDetails
                }, {
                    upsert: true,
                    new: true,
                    useFindAndModify: false
                }, callback)
            }


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
    insertOrUpdateUserMasterData(req, res)
})

router.put("/:userid", (req, res) => {
    insertOrUpdateUserMasterData(req, res)
})

router.get("/:userid", (req, res) => {
    getUserMasterData(req, res)
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