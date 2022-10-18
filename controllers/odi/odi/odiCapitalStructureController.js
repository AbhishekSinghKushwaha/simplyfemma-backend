const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const odiCapitalStructureModel = require("../../../models/odi/odi/odiCapitalStructureModel");
const auth = require('../../../middleware/auth')

router.post("/", (req, res) => {
    let {
        odiCapitalStructureCode,
        odiCapitalStructurePartyName,
        odiCapitalStructureStack,
        odiCapitalStructurePartyOrigin,
        odiCapitalStructureAmount,
        currentDate
    } = req.body.odiCapitalStructureDetails;


    odiCapitalStructureModel.findOne({
            odiCapitalStructureCode,
        })
        .then(odiCapitalStructure => {
            if (odiCapitalStructure) {
                return res.status(400).json({
                    message: "odiCapitalStructure Code Already Exists"
                });
            }

            const newodiCapitalStructure = new odiCapitalStructureModel({
                odiCapitalStructureCode,
                odiCapitalStructurePartyName,
                odiCapitalStructureStack,
                odiCapitalStructurePartyOrigin,
                odiCapitalStructureAmount,
                currentDate
            });
            newodiCapitalStructure
                .save()
                .then(odiCapitalStructure => {
                    res.status(200).type('json').send(JSON.stringify({
                        // odiCapitalStructure
                        message: "Successfully added odiCapitalStructure Details"
                    }, null, 2));

                })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

router.delete("/", (req, res) => {
    let {
        odiCapitalStructureCode
    } = req.body.odiCapitalStructureDetails;


    odiCapitalStructureModel.findOneAndDelete({
            odiCapitalStructureCode
        })
        .then(odiCapitalStructure => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Removed odiCapitalStructure Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.put("/", (req, res) => {
    let {
        odiCapitalStructureCode
    } = req.body.odiCapitalStructureDetails;

    odiCapitalStructureModel.findOneAndUpdate({
            odiCapitalStructureCode
        }, {
            $set: req.body.odiCapitalStructureDetails
        })
        .then(odiCapitalStructure => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated odiCapitalStructure Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.get('/getAlldisinvestmentDetails', (req, res) => {
    odiCapitalStructureModel.aggregate([{
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