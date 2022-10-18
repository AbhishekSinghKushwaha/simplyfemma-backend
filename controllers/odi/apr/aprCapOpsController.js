const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const aprCapOpsModel = require("../../../models/odi/apr/aprCapOpsModel");
const auth = require('../../../middleware/auth')

router.post("/", (req, res) => {
    let {
        aprCapOpsCode,
        aprCapOpsDate,
        aprCapOpsNetProfit,
        aprCapOpsDividend,
        aprCapOpsNetWorth,
        aprCapOpscurrentDate
    } = req.body.aprCapOpsDetails;


    aprCapOpsModel.findOne({
            aprCapOpsCode,
        })
        .then(aprCapOps => {
            if (aprCapOps) {
                return res.status(400).json({
                    message: "aprCapOps Code Already Exists"
                });
            }

            const newaprCapOps = new aprCapOpsModel({
                aprCapOpsCode,
                aprCapOpsDate,
                aprCapOpsNetProfit,
                aprCapOpsDividend,
                aprCapOpsNetWorth,
                aprCapOpscurrentDate
            });
            newaprCapOps
                .save()
                .then(aprCapOps => {
                    res.status(200).type('json').send(JSON.stringify({
                        // aprCapOps
                        message: "Successfully added aprCapOps Details"
                    }, null, 2));

                })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

router.delete("/", (req, res) => {
    let {
        aprCapOpsCode
    } = req.body.aprCapOpsDetails;


    aprCapOpsModel.findOneAndDelete({
            aprCapOpsCode
        })
        .then(aprCapOps => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Removed aprCapOps Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.put("/", (req, res) => {
    let {
        aprCapOpsCode
    } = req.body.aprCapOpsDetails;

    aprCapOpsModel.findOneAndUpdate({
            aprCapOpsCode
        }, {
            $set: req.body.aprCapOpsDetails
        })
        .then(aprCapOps => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated aprCapOps Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.get('/getAlldisinvestmentDetails', (req, res) => {
    aprCapOpsModel.aggregate([{
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