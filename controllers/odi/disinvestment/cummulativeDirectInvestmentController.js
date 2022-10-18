const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const cummulativeDirectInvestmentModel = require("../../../models/odi/disinvestment/cummulativeDirectInvestmentModel");
const auth = require('../../../middleware/auth')

router.post("/", (req, res) => {
    let {       
    cummulativeDirectInvestmentCode,
    cummulativeDirectInvestmentType,
    cummulativeDirectInvestmentAmount,
    cummulativeDirectInvestmentCurrentDate,
    } = req.body.cummulativeDirectInvestmentDetails;


    cummulativeDirectInvestmentModel.findOne({
        cummulativeDirectInvestmentCode,
        })
        .then(cummulativeDirectInvestment => {
            if (cummulativeDirectInvestment) {
                return res.status(400).json({
                    message: "cummulativeDirectInvestment Bank Code Already Exists"
                });
            }

            const newCummulativeDirectInvestment = new cummulativeDirectInvestmentModel({
                cummulativeDirectInvestmentCode,
                cummulativeDirectInvestmentType,
                cummulativeDirectInvestmentAmount,
                cummulativeDirectInvestmentCurrentDate,
            });
            newCummulativeDirectInvestment
                .save()
                .then(cummulativeDirectInvestment => {
                    res.status(200).type('json').send(JSON.stringify({
                        // cummulativeDirectInvestment
                        message: "Successfully added cummulativeDirectInvestment Type Details"
                    }, null, 2));

                })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

router.delete("/", (req, res) => {
    let {
        cummulativeDirectInvestmentCode
    } = req.body.cummulativeDirectInvestmentDetails;


    cummulativeDirectInvestmentModel.findOneAndDelete({
        cummulativeDirectInvestmentCode
        })
        .then(cummulativeDirectInvestment => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Removed cummulativeDirectInvestment Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.put("/", (req, res) => {
    let {
        cummulativeDirectInvestmentCode
    } = req.body.cummulativeDirectInvestmentDetails;

    cummulativeDirectInvestmentModel.findOneAndUpdate({
        cummulativeDirectInvestmentCode
        }, {
            $set: req.body.cummulativeDirectInvestmentDetails
        })
        .then(cummulativeDirectInvestment => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated cummulative Direct Investment Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.get('/getAlldisinvestmentDetails', (req, res) => {
    cummulativeDirectInvestmentModel.aggregate([{
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