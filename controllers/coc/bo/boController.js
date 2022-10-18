const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const boModel = require("../../../models/coc/bo/boModel");
const auth = require('../../../middleware/auth');

router.post("/", async (req,res) => {
    let{
        boCode,
        nameOfApplicant,
        dateOfIncorporation,
        incomeTaxPan,
        natureOfActivitiesUnderTakenwithNic,
        dateofApprovalOffice,
        validityPeriodOFTheApproval,
        incomeAndExpendiruteOfTheLoBo,
        datesOfSubmissionOfAnnualActivityCertificates,
        natureOfContraventionsAndReasonsForTheContravention,
        allSupportingDocumentsMayBeSubmitted
    } = req.body.boDetails;
    
    await boModel.findOne({
        boCode
    })
    .then(async (boDetails) => {
        if(boDetails){
            return res.status(400).json({
                message: "User ID Already Exists"
            });
        }
        const newBoDetails = new boModel({
            boCode,
            nameOfApplicant,
            dateOfIncorporation,
            incomeTaxPan,
            natureOfActivitiesUnderTakenwithNic,
            dateofApprovalOffice,
            validityPeriodOFTheApproval,
            incomeAndExpendiruteOfTheLoBo,
            datesOfSubmissionOfAnnualActivityCertificates,
            natureOfContraventionsAndReasonsForTheContravention,
            allSupportingDocumentsMayBeSubmitted
        });
        await newBoDetails
        .save()
        .then(boDetails => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully added BO Details"
            }, null, 2));
        })
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.delete("/", async (req,res) => {
    let {
        boCode
    } = req.body.boDetails;

    await boModel.findOneAndDelete({
        boCode
    })
    .then(boDetails=> {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Removed BO Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.put("/", async (req, res) => {
    let {
        boCode
    } = req.body.boDetails;

    await boModel.findOneAndUpdate({
        boCode
    },{
        $set: req.body.boDetails
    })
    .then(boDetails => {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Updated BO Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.get('/getAllBO', async (req, res) => {
    await boModel.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'SF_BO_Details_BO',
                localField: '_id',
                foreignField: 'userId',
                as: 'bo',
            },
        },
        {
            $unwind: {
                path: '$bo',
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $sort: {
                "boCode": -1
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