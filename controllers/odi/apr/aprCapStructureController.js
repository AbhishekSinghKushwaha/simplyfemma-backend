const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const aprCapStructureModel = require("../../../models/odi/apr/aprCapStructureModel");
const auth = require('../../../middleware/auth')

router.post("/", (req, res) => {
    let {
        aprCapStructureCode,
        aprCapPartyName,
        aprCapPartyType,
        aprCapPartyPct,
        aprCapPartyAmount,
        aprCapCurrentDate
    } = req.body.aprCapStructureDetails;

    aprCapStructureModel.findOne({
            aprCapStructureCode,
        })
        .then(aprCapStructure => {
            if (aprCapStructure) {
                return res.status(400).json({
                    message: "aprCapStructure Code Already Exists"
                });
            }

            const newaprCapStructure = new aprCapStructureModel({
                aprCapStructureCode,
                aprCapPartyName,
                aprCapPartyType,
                aprCapPartyPct,
                aprCapPartyAmount,
                aprCapCurrentDate
            });
            newaprCapStructure
                .save()
                .then(aprCapStructure => {
                    res.status(200).type('json').send(JSON.stringify({
                        // aprCapStructure
                        message: "Successfully added aprCapStructure Details"
                    }, null, 2));

                })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

router.delete("/", (req, res) => {
    let {
        aprCapStructureCode
    } = req.body.aprCapStructureDetails;


    aprCapStructureModel.findOneAndDelete({
            aprCapStructureCode
        })
        .then(aprCapStructure => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Removed aprCapStructure Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.put("/", (req, res) => {
    let {
        aprCapStructureCode
    } = req.body.aprCapStructureDetails;

    aprCapStructureModel.findOneAndUpdate({
            aprCapStructureCode
        }, {
            $set: req.body.aprCapStructureDetails
        })
        .then(aprCapStructure => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated aprCapStructure Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


router.get('/getAlldisinvestmentDetails', (req, res) => {
    aprCapStructureModel.aggregate([{
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