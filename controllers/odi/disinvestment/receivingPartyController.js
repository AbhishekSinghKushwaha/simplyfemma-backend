const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const receivingPartyModel = require("../../../models/odi/disinvestment/receivingPartyModel");
const auth = require('../../../middleware/auth')

router.post("/", (req, res) => {
    let {
        receivingPartyCode,
        receivingPartyType,
        receivingPartyName,
        receivingPartyPct,
        receivingPartyCurrentDate,
    } = req.body.receivingPartyDetails;


    receivingPartyModel.findOne({
            receivingPartyCode,
        })
        .then(receivingParty => {
            if (receivingParty) {
                return res.status(400).json({
                    message: "receivingParty Bank Code Already Exists"
                });
            }

            const newreceivingParty = new receivingPartyModel({
                receivingPartyCode,
                receivingPartyType,
                receivingPartyName,
                receivingPartyPct,
            });
            newreceivingParty
                .save()
                .then(receivingParty => {
                    res.status(200).type('json').send(JSON.stringify({
                        // receivingParty
                        message: "Successfully added receivingParty Type Details"
                    }, null, 2));

                })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

router.delete("/", (req, res) => {
    let {
        receivingPartyCode
    } = req.body.receivingPartyDetails;


    receivingPartyModel.findOneAndDelete({
            receivingPartyCode
        })
        .then(receivingParty => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Removed receivingParty Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.put("/", (req, res) => {
    let {
        receivingPartyCode
    } = req.body.receivingPartyDetails;

    receivingPartyModel.findOneAndUpdate({
            receivingPartyCode
        }, {
            $set: req.body.receivingPartyDetails
        })
        .then(receivingParty => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated receivingParty Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.get('/getAlldisinvestmentDetails', (req, res) => {
    receivingPartyModel.aggregate([{
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