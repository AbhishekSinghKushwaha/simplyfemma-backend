const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const aprInvestmentSdsModel = require("../../../models/odi/apr/aprInvestmentSdsModel");
const auth = require('../../../middleware/auth')

router.post("/", (req, res) => {
    let {
        aprInvestmentSdsName,
        aprInvestmentSdsLevel,
        aprInvestmentSdsCountry,
        aprInvestmentSdsNameParent,
        aprInvestmentSdsLevelParent,
        aprInvestmentSdsCountryParent,
        aprInvestmentSdsInvAmount,
        aprInvestmentSdsInvAmountDate,
        aprInvestmentSdsInvType,
        aprInvestmentSdsType,
        aprInvestmentSdsActivityCode,
        aprInvestmentSdsPctStake,
        aprInvestmentSdsDate,
        aprInvestmentSdsCurrentDate
    } = req.body.aprInvestmentSdsDetails;


    aprInvestmentSdsModel.findOne({
            aprInvestmentSdsName,
        })
        .then(aprInvestmentSds => {
            if (aprInvestmentSds) {
                return res.status(400).json({
                    message: "aprInvestmentSds Code Already Exists"
                });
            }

            const newaprInvestmentSds = new aprInvestmentSdsModel({
                aprInvestmentSdsName,
                aprInvestmentSdsLevel,
                aprInvestmentSdsCountry,
                aprInvestmentSdsNameParent,
                aprInvestmentSdsLevelParent,
                aprInvestmentSdsCountryParent,
                aprInvestmentSdsInvAmount,
                aprInvestmentSdsInvAmountDate,
                aprInvestmentSdsInvType,
                aprInvestmentSdsType,
                aprInvestmentSdsActivityCode,
                aprInvestmentSdsPctStake,
                aprInvestmentSdsDate,
                aprInvestmentSdsCurrentDate
            });
            newaprInvestmentSds
                .save()
                .then(aprInvestmentSds => {
                    res.status(200).type('json').send(JSON.stringify({
                        // aprInvestmentSds
                        message: "Successfully added aprInvestmentSds Details"
                    }, null, 2));

                })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

router.delete("/", (req, res) => {
    let {
        aprInvestmentSdsName
    } = req.body.aprInvestmentSdsDetails;


    aprInvestmentSdsModel.findOneAndDelete({
            aprInvestmentSdsName
        })
        .then(aprInvestmentSds => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Removed aprInvestmentSds Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.put("/", (req, res) => {
    let {
        aprInvestmentSdsName
    } = req.body.aprInvestmentSdsDetails;

    aprInvestmentSdsModel.findOneAndUpdate({
            aprInvestmentSdsName
        }, {
            $set: req.body.aprInvestmentSdsDetails
        })
        .then(aprInvestmentSds => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated aprInvestmentSds Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.get('/getAlldisinvestmentDetails', (req, res) => {
    aprInvestmentSdsModel.aggregate([{
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