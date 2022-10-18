const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const odiSpvModel = require("../../../models/odi/odi/odiSpvModel");
const auth = require('../../../middleware/auth')

router.post("/", (req, res) => {
    let {
        odiSpvCode,
        odiSpvPurpose,
        odiSpvFullAcquisationValue,
        odiSpvInfusion,
        odiSpvGuarantedFund,
        odiSpvNonGuarantedFund,
        odiSpvEqFund,
        odiSpvSecuritisation,
        odiSpvOtherDetail,
        odiSpvOtherDetailAmount,
        odiSpvTotal,
        currentDate
    } = req.body.odiSpvDetails;


    odiSpvModel.findOne({
            odiSpvCode,
        })
        .then(odiSpv => {
            if (odiSpv) {
                return res.status(400).json({
                    message: "odiSpv Code Already Exists"
                });
            }

            const newodiSpv = new odiSpvModel({
                odiSpvCode,
                odiSpvPurpose,
                odiSpvFullAcquisationValue,
                odiSpvInfusion,
                odiSpvGuarantedFund,
                odiSpvNonGuarantedFund,
                odiSpvEqFund,
                odiSpvSecuritisation,
                odiSpvOtherDetail,
                odiSpvOtherDetailAmount,
                odiSpvTotal,
                currentDate
            });
            newodiSpv
                .save()
                .then(odiSpv => {
                    res.status(200).type('json').send(JSON.stringify({
                        // odiSpv
                        message: "Successfully added odiSpv Details"
                    }, null, 2));

                })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

router.delete("/", (req, res) => {
    let {
        odiSpvCode
    } = req.body.odiSpvDetails;


    odiSpvModel.findOneAndDelete({
            odiSpvCode
        })
        .then(odiSpv => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Removed odiSpv Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.put("/", (req, res) => {
    let {
        odiSpvCode
    } = req.body.odiSpvDetails;

    odiSpvModel.findOneAndUpdate({
            odiSpvCode
        }, {
            $set: req.body.odiSpvDetails
        })
        .then(odiSpv => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated odiSpv Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.get('/getAlldisinvestmentDetails', (req, res) => {
    odiSpvModel.aggregate([{
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