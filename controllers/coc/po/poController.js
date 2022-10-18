const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const poModel = require("../../../models/coc/po/poModel");
const auth = require('../../../middleware/auth');

router.post("/", async (req,res) => {
    let{
        poCode,
        nameOfApplicant,
        dateOfIncorporation,
        incomeTaxPan,
        natureOfActivitiesUnderTakenwithNic,
        dateofApprovalOffice,
        validityPeriodOFTheApproval,
        incomeAndExpendiruteOfTheLo,
        datesOfSubmissionOfAnnualActivityCertificates,
        natureOfContraventionsAndReasonsForTheContravention,
        allSupportingDocumentsMayBeSubmitted
    } = req.body.poDetails;
    
    await poModel.findOne({
        poCode
    })
    .then(async (poDetails) => {
        if(poDetails){
            return res.status(400).json({
                message: "User ID Already Exists"
            });
        }
        const newLoDetails = new poModel({
            poCode,
            nameOfApplicant,
            dateOfIncorporation,
            incomeTaxPan,
            natureOfActivitiesUnderTakenwithNic,
            dateofApprovalOffice,
            validityPeriodOFTheApproval,
            incomeAndExpendiruteOfTheLo,
            datesOfSubmissionOfAnnualActivityCertificates,
            natureOfContraventionsAndReasonsForTheContravention,
            allSupportingDocumentsMayBeSubmitted
        });
        await newLoDetails
        .save()
        .then(poDetails => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully added PO Details"
            }, null, 2));
        })
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.delete("/", async (req,res) => {
    let {
        poCode
    } = req.body.poDetails;

    await poModel.findOneAndDelete({
        poCode
    })
    .then(poDetails=> {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Removed PO Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.put("/", async (req, res) => {
    let {
        poCode
    } = req.body.poDetails;

    await poModel.findOneAndUpdate({
        poCode
    },{
        $set: req.body.poDetails
    })
    .then(poDetails => {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Updated PO Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.get('/getAllPO', async (req, res) => {
    await poModel.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'SF_PO_Details_PO',
                localField: '_id',
                foreignField: 'userId',
                as: 'po',
            },
        },
        {
            $unwind: {
                path: '$po',
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $sort: {
                "poCode": -1
            },
        },
    ])
    .then(Agencies => {
        res.status(200).type('json').send(JSON.stringify({
            Agencies
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

module.exports = router;