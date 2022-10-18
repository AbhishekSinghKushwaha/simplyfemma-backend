const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const aprModel = require("../../../models/odi/apr/aprModel");
const auth = require('../../../middleware/auth')

router.post("/", (req, res) => {
    let {
        aprDate,
        aprJVPeriod,
        aprCapStructurecode,
        aprOpsDetailCode,
        aprRepatriationDetailCode,
        aprInvestmentSDSDetailCode,
        aprCertificateCode,
        aprDesignatedSignature,
        partyCode,
        aprDesignatedPlace,
        aprDesignatedSignDate,
        aprStatutoryAudit,
        aprStatutorySignature,
        aprStatutoryPlace,
        aprStatutorySignDate,
        aprStatutoryCurrentDate,
    } = req.body.aprDetails;


    aprModel.findOne({
            partyCode,
        })
        .then(apr => {
            if (apr) {
                return res.status(400).json({
                    message: "apr Code Already Exists"
                });
            }

            const newapr = new aprModel({
                partyCode,
                aprDate,
                aprJVPeriod,
                aprCapStructurecode,
                aprOpsDetailCode,
                aprRepatriationDetailCode,
                aprInvestmentSDSDetailCode,
                aprCertificateCode,
                aprDesignatedSignature,
                partyCode,
                aprDesignatedPlace,
                aprDesignatedSignDate,
                aprStatutoryAudit,
                aprStatutorySignature,
                aprStatutoryPlace,
                aprStatutorySignDate,
                aprStatutoryCurrentDate,
            });
            newapr
                .save()
                .then(apr => {
                    res.status(200).type('json').send(JSON.stringify({
                        // apr
                        message: "Successfully added apr Details"
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
    } = req.body.aprDetails;


    aprModel.findOneAndDelete({
            partyCode
        })
        .then(apr => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Removed apr Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.put("/", (req, res) => {
    let {
        partyCode
    } = req.body.aprDetails;

    aprModel.findOneAndUpdate({
            partyCode
        }, {
            $set: req.body.aprDetails
        })
        .then(apr => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated apr Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.get('/getAlldisinvestmentDetails', (req, res) => {
    aprModel.aggregate([{
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