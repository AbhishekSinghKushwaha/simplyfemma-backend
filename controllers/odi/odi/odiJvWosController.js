const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const odiJvWosModel = require("../../../models/odi/odi/odiJvWosModel");
const auth = require('../../../middleware/auth')

router.post("/", (req, res) => {
    let {
        odiJvWosCode,
        odiJvWosIPName,
        odiJvWosUID,
        odiJvWosADBank,
        odiJvWosName,
        odiJvWosAddress,
        odiJvWosCountry,
        odiJvWosEmail,
        currentDate,
    } = req.body.odiJvWosDetails;


    odiJvWosModel.findOne({
            odiJvWosCode,
        })
        .then(odiJvWos => {
            if (odiJvWos) {
                return res.status(400).json({
                    message: "odiJvWos Code Already Exists"
                });
            }

            const newodiJvWos = new odiJvWosModel({
                odiJvWosCode,
                odiJvWosIPName,
                odiJvWosUID,
                odiJvWosADBank,
                odiJvWosName,
                odiJvWosAddress,
                odiJvWosCountry,
                odiJvWosEmail,
                currentDate,
            });
            newodiJvWos
                .save()
                .then(odiJvWos => {
                    res.status(200).type('json').send(JSON.stringify({
                        // odiJvWos
                        message: "Successfully added odiJvWos Details"
                    }, null, 2));

                })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

router.delete("/", (req, res) => {
    let {
        odiJvWosCode
    } = req.body.odiJvWosDetails;


    odiJvWosModel.findOneAndDelete({
            odiJvWosCode
        })
        .then(odiJvWos => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Removed odiJvWos Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.put("/", (req, res) => {
    let {
        odiJvWosCode
    } = req.body.odiJvWosDetails;

    odiJvWosModel.findOneAndUpdate({
            odiJvWosCode
        }, {
            $set: req.body.odiJvWosDetails
        })
        .then(odiJvWos => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated odiJvWos Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.get('/getAlldisinvestmentDetails', (req, res) => {
    odiJvWosModel.aggregate([{
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