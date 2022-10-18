const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const odiSpvInvModel = require("../../../models/odi/odi/odiSpvInvModel");
const auth = require('../../../middleware/auth')

router.post("/", (req, res) => {

    let {
        odiSpvInvCode,
        odiSpvInvName,
        odiSpvInvLevel,
        odiSpvInvCountry,
        odiSpvInvNameParent,
        odiSpvInvLevelParent,
        odiSpvInvCountryParent,
        odiSpvInvInvType,
        odiSpvInvType,
        odiSpvInvActivityCode,
        odiSpvInvAmount,
        odiSpvInvDate,
        odiSpvInvPctParent,
        currentDate,
    } = req.body.odiSpvInvDetails;


    odiSpvInvModel.findOne({
            odiSpvInvCode,
        })
        .then(odiSpvInv => {
            if (odiSpvInv) {
                return res.status(400).json({
                    message: "odiSpvInv Code Already Exists"
                });
            }

            const newodiSpvInv = new odiSpvInvModel({
                odiSpvInvCode,
                odiSpvInvName,
                odiSpvInvLevel,
                odiSpvInvCountry,
                odiSpvInvNameParent,
                odiSpvInvLevelParent,
                odiSpvInvCountryParent,
                odiSpvInvInvType,
                odiSpvInvType,
                odiSpvInvActivityCode,
                odiSpvInvAmount,
                odiSpvInvDate,
                odiSpvInvPctParent,
                currentDate,
            });
            newodiSpvInv
                .save()
                .then(odiSpvInv => {
                    res.status(200).type('json').send(JSON.stringify({
                        // odiSpvInv
                        message: "Successfully added odiSpvInv Details"
                    }, null, 2));

                })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

router.delete("/", (req, res) => {
    let {
        odiSpvInvCode
    } = req.body.odiSpvInvDetails;


    odiSpvInvModel.findOneAndDelete({
            odiSpvInvCode
        })
        .then(odiSpvInv => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Removed odiSpvInv Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.put("/", (req, res) => {
    let {
        odiSpvInvCode
    } = req.body.odiSpvInvDetails;

    odiSpvInvModel.findOneAndUpdate({
            odiSpvInvCode
        }, {
            $set: req.body.odiSpvInvDetails
        })
        .then(odiSpvInv => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated odiSpvInv Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.get('/getAlldisinvestmentDetails', (req, res) => {
    odiSpvInvModel.aggregate([{
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