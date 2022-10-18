const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const odiPartyFinancialModel = require("../../../models/odi/odi/odiPartyFinancialModel");
const auth = require('../../../middleware/auth')

router.post("/", (req, res) => {
    let {
        partyCode,
        odiPartyFinancialDate,
        odiPartyFinancialForexEarning,
        odiPartyFinancialNetProfit,
        odiPartyFinancialPaidupCapital,
        odiPartyFinancialNetWorth,
        odiPartyFinancialIndParty,
        odiPartyFinancialGroupCompany,
        currentDate,
    } = req.body.odiPartyFinancialDetails;


    odiPartyFinancialModel.findOne({
            partyCode,
        })
        .then(odiPartyFinancial => {
            if (odiPartyFinancial) {
                return res.status(400).json({
                    message: "odiPartyFinancial Code Already Exists"
                });
            }

            const newodiPartyFinancial = new odiPartyFinancialModel({
                partyCode,
                odiPartyFinancialDate,
                odiPartyFinancialForexEarning,
                odiPartyFinancialNetProfit,
                odiPartyFinancialPaidupCapital,
                odiPartyFinancialNetWorth,
                odiPartyFinancialIndParty,
                odiPartyFinancialGroupCompany,
                currentDate,
            });
            newodiPartyFinancial
                .save()
                .then(odiPartyFinancial => {
                    res.status(200).type('json').send(JSON.stringify({
                        // odiPartyFinancial
                        message: "Successfully added odiPartyFinancial Details"
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
    } = req.body.odiPartyFinancialDetails;


    odiPartyFinancialModel.findOneAndDelete({
            partyCode
        })
        .then(odiPartyFinancial => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Removed odiPartyFinancial Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.put("/", (req, res) => {
    let {
        partyCode
    } = req.body.odiPartyFinancialDetails;

    odiPartyFinancialModel.findOneAndUpdate({
            partyCode
        }, {
            $set: req.body.odiPartyFinancialDetails
        })
        .then(odiPartyFinancial => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated odiPartyFinancial Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.get('/getAlldisinvestmentDetails', (req, res) => {
    odiPartyFinancialModel.aggregate([{
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