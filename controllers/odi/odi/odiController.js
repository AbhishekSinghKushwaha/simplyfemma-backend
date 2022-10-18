const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const odiModel = require("../../../models/odi/odi/odiModel");
const auth = require('../../../middleware/auth')

router.post("/", (req, res) => {
    let {
        odiInvestmentRoute,
        partyCode,
        odiNetworth,
        odiNetworthonDate,
        odiJvWosDetail,
        jvWosCode,
        odiInvestigation,
        investigationAgencyCode,
        odiJvWosAccountingyear,
        odiJvWosActivitycode,
        odiJvWosEstimatedcostAcquisition,
        odiJvWosFinancialcommitmentcurrent,
        odiJvWosFinancialcommitmentAll,
        odiJvWosSPV,
        odiSpvCode,
        odiCapitalStructureCode,
        odiSpvInvDetail,
        odiSpvInvDetailCode,
        odiSpvInvPurpose,
        odiInvMethod,
        odiInvCategory,
        odiInvOtherDetail,
        odiRemittanceAmount,
        odiDeclaration,
        odiPlace,
        odiDate,
        odiCurrentDate,
    } = req.body.odiDetails;


    odiModel.findOne({
            partyCode,
        })
        .then(odi => {
            if (odi) {
                return res.status(400).json({
                    message: "odi Code Already Exists"
                });
            }

            const newOdi = new odiModel({
                odiInvestmentRoute,
                partyCode,
                odiNetworth,
                odiNetworthonDate,
                odiJvWosDetail,
                jvWosCode,
                odiInvestigation,
                investigationAgencyCode,
                odiJvWosAccountingyear,
                odiJvWosActivitycode,
                odiJvWosEstimatedcostAcquisition,
                odiJvWosFinancialcommitmentcurrent,
                odiJvWosFinancialcommitmentAll,
                odiJvWosSPV,
                odiSpvCode,
                odiCapitalStructureCode,
                odiSpvInvDetail,
                odiSpvInvDetailCode,
                odiSpvInvPurpose,
                odiInvMethod,
                odiInvCategory,
                odiInvOtherDetail,
                odiRemittanceAmount,
                odiDeclaration,
                odiPlace,
                odiDate,
                odiCurrentDate,
            });
            newOdi
                .save()
                .then(odi => {
                    res.status(200).type('json').send(JSON.stringify({
                        // odi
                        message: "Successfully added odi Details"
                    }, null, 2));

                })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

router.delete("/", (req, res) => {
    let {
        partyCode
    } = req.body.odiDetails;


    odiModel.findOneAndDelete({
            partyCode
        })
        .then(odi => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Removed odi Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.put("/", (req, res) => {
    let {
        partyCode
    } = req.body.odiDetails;

    odiModel.findOneAndUpdate({
            partyCode
        }, {
            $set: req.body.odiDetails
        })
        .then(odi => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated odi Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


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