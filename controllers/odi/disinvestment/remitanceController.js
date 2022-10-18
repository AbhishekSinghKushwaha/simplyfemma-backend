const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const remitanceModel = require("../../../models/odi/disinvestment/remitanceModel");
const auth = require('../../../middleware/auth')

router.post("/", (req, res) => {
    let {
        remitanceCode,
        remitanceDate,
        remitanceMethod,
        remitanceCategory,
        remitanceAmount,
        remitanceCurrencyType,
        remitanceCurrentDate,
    } = req.body.remitanceDetails;


    remitanceModel.findOne({
            remitanceCode,
        })
        .then(remitance => {
            if (remitance) {
                return res.status(400).json({
                    message: "remitance Code Already Exists"
                });
            }

            const newremitance = new remitanceModel({
                remitanceCode,
                remitanceDate,
                remitanceMethod,
                remitanceCategory,
                remitanceAmount,
                remitanceCurrencyType,
                remitanceCurrentDate,
            });
            newremitance
                .save()
                .then(remitance => {
                    res.status(200).type('json').send(JSON.stringify({
                        // remitance
                        message: "Successfully added remitance Details"
                    }, null, 2));

                })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

router.delete("/", (req, res) => {
    let {
        remitanceCode
    } = req.body.remitanceDetails;


    remitanceModel.findOneAndDelete({
            remitanceCode
        })
        .then(remitance => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Removed remitance Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.put("/", (req, res) => {
    let {
        remitanceCode
    } = req.body.remitanceDetails;

    remitanceModel.findOneAndUpdate({
            remitanceCode
        }, {
            $set: req.body.remitanceDetails
        })
        .then(remitance => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated remitance Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.get('/getAlldisinvestmentDetails', (req, res) => {
    remitanceModel.aggregate([{
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