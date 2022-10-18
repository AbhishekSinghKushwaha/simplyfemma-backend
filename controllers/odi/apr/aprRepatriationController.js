const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const aprRepatriationModel = require("../../../models/odi/apr/aprRepatriationModel");
const auth = require('../../../middleware/auth')

router.post("/", (req, res) => {
    let {
        aprRepatriationCode,
        aprRepatriationDate,
        aprRepatriationDividend,
        aprRepatriationRepaymentLoan,
        aprRepatriationEquity,
        aprRepatriationRoyalties,
        aprRepatriationTechFees,
        aprRepatriationConsFees,
        aprRepatriationOtherFees,
        aprRepatriationProfit,
        aprRepatriationRetainedEarning,
        aprRepatriationFDIIndiaAmt,
        aprRepatriationRefundShare,
        aprRepatriationCurrentDate
    } = req.body.aprRepatriationDetails;


    aprRepatriationModel.findOne({
            aprRepatriationCode,
        })
        .then(aprRepatriation => {
            if (aprRepatriation) {
                return res.status(400).json({
                    message: "aprRepatriation Code Already Exists"
                });
            }

            const newaprRepatriation = new aprRepatriationModel({
                aprRepatriationCode,
                aprRepatriationDate,
                aprRepatriationDividend,
                aprRepatriationRepaymentLoan,
                aprRepatriationEquity,
                aprRepatriationRoyalties,
                aprRepatriationTechFees,
                aprRepatriationConsFees,
                aprRepatriationOtherFees,
                aprRepatriationProfit,
                aprRepatriationRetainedEarning,
                aprRepatriationFDIIndiaAmt,
                aprRepatriationRefundShare,
                aprRepatriationCurrentDate
            });
            newaprRepatriation
                .save()
                .then(aprRepatriation => {
                    res.status(200).type('json').send(JSON.stringify({
                        // aprRepatriation
                        message: "Successfully added aprRepatriation Details"
                    }, null, 2));

                })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

router.delete("/", (req, res) => {
    let {
        aprRepatriationCode
    } = req.body.aprRepatriationDetails;


    aprRepatriationModel.findOneAndDelete({
            aprRepatriationCode
        })
        .then(aprRepatriation => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Removed aprRepatriation Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.put("/", (req, res) => {
    let {
        aprRepatriationCode
    } = req.body.aprRepatriationDetails;

    aprRepatriationModel.findOneAndUpdate({
            aprRepatriationCode
        }, {
            $set: req.body.aprRepatriationDetails
        })
        .then(aprRepatriation => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated aprRepatriation Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.get('/getAlldisinvestmentDetails', (req, res) => {
    aprRepatriationModel.aggregate([{
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