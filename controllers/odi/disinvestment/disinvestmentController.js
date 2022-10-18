const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const disinvestmentModel = require("../../../models/odi/disinvestment/disinvestmentModel");
const auth = require('../../../middleware/auth')

router.post("/", (req, res) => {
    let {
        disInvestmentBankcode,
        disInvestmentPeriod,
        disInvestmentPartyCode,
        disInvestmentRoute,
        disInvestmentType,
        disInvestmentDate,
        disInvestmentPANNo,
        disInvestmentReceivingPartyName,
        disInvestmentActivityDetail,
        disInvestmentMethod,
        disInvestmentPartyHoldingPct,
        disInvestmentCumulativeDirectInv,
        disInvestmentDatewiseRemitanceDetailcode,
        disInvestmentFairValue,
        disInvestmentWriteOff,
        disInvestmentWriteOffType,
        disInvestmentWriteOffAmount,
        disInvestmentAmountWriteOff,
        disInvestmentAmountRepatriated,
        disInvestmentAmountRepatriatedDate,
        disInvestmentAmountRepatriatedType,
        disInvestmentAmountRepatriatedAmount,
        disInvestmentTotalAmountRepatriatedAPR,
        disInvestmentTotalRepatriatedType,
        disInvestmentTotalRepatriatedAmount,
        disInvestmentTotalRepatriatedDate,
        disInvestmentCertificate,
        disInvestmentPlace,
        disInvestmentAnnexture,
        disInvestmentCurrentDate,
    } = req.body.disinvestmentDetails;


    disinvestmentModel.findOne({
            disInvestmentBankcode,
        })
        .then(disinvestment => {
            if (disinvestment) {
                return res.status(400).json({
                    message: "Disinvestment Bank Code Already Exists"
                });
            }

            const newDisinvestment = new disinvestmentModel({
                disInvestmentBankcode,
                disInvestmentPeriod,
                disInvestmentPartyCode,
                disInvestmentRoute,
                disInvestmentType,
                disInvestmentDate,
                disInvestmentPANNo,
                disInvestmentReceivingPartyName,
                disInvestmentActivityDetail,
                disInvestmentMethod,
                disInvestmentPartyHoldingPct,
                disInvestmentCumulativeDirectInv,
                disInvestmentDatewiseRemitanceDetailcode,
                disInvestmentFairValue,
                disInvestmentWriteOff,
                disInvestmentWriteOffType,
                disInvestmentWriteOffAmount,
                disInvestmentAmountWriteOff,
                disInvestmentAmountRepatriated,
                disInvestmentAmountRepatriatedDate,
                disInvestmentAmountRepatriatedType,
                disInvestmentAmountRepatriatedAmount,
                disInvestmentTotalAmountRepatriatedAPR,
                disInvestmentTotalRepatriatedType,
                disInvestmentTotalRepatriatedAmount,
                disInvestmentTotalRepatriatedDate,
                disInvestmentCertificate,
                disInvestmentPlace,
                disInvestmentAnnexture,
                disInvestmentCurrentDate,
            });
            newDisinvestment
                .save()
                .then(disinvestment => {
                    res.status(200).type('json').send(JSON.stringify({
                        // disinvestment
                        message: "Successfully added disinvestment Type Details"
                    }, null, 2));

                })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

router.delete("/", (req, res) => {
    let {
        disInvestmentBankcode
    } = req.body.disinvestmentDetails;


    disinvestmentModel.findOneAndDelete({
        disInvestmentBankcode
        })
        .then(disinvestment => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Removed Disinvestment Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.put("/", (req, res) => {
    let {
        disInvestmentBankcode
    } = req.body.disinvestmentDetails;


    disinvestmentModel.findOneAndUpdate({
            disInvestmentBankcode
        }, {
            $set: req.body.disinvestmentDetails
        })
        .then(disinvestment => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated disinvestment Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.get('/getAlldisinvestmentDetails', (req, res) => {
    disinvestmentModel.aggregate([{
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