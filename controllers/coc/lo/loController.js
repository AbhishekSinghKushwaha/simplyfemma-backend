const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const loModel = require("../../../models/coc/lo/loModel");
const auth = require('../../../middleware/auth');

router.post("/", async (req,res) => {
    let{
        loCode,
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
    } = req.body.loDetails;
    
    await loModel.findOne({
        loCode
    })
    .then(async (loDetails) => {
        if(loDetails){
            return res.status(400).json({
                message: "User ID Already Exists"
            });
        }
        const newLoDetails = new loModel({
            loCode,
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
        .then(loDetails => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully added LO Details"
            }, null, 2));
        })
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.delete("/", async (req,res) => {
    let {
        loCode
    } = req.body.loDetails;

    await loModel.findOneAndDelete({
        loCode
    })
    .then(loDetails=> {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Removed LO Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.put("/", async (req, res) => {
    let {
        loCode
    } = req.body.loDetails;

    await loModel.findOneAndUpdate({
        loCode
    },{
        $set: req.body.loDetails
    })
    .then(loDetails => {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Updated LO Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.get('/getAllLO', async (req, res) => {
    await loModel.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'SF_LO_Details_LO',
                localField: '_id',
                foreignField: 'userId',
                as: 'lo',
            },
        },
        {
            $unwind: {
                path: '$lo',
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $sort: {
                "loCode": -1
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