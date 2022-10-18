const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const odiModel = require("../../../models/coc/odi/odiModel");
const auth = require('../../../middleware/auth');

router.post("/", async (req,res) => {
    let{
        odiCode,
        nameofApplicant,
        dateOfIncorporation,
        incomeTaxPan,
        natureOfActivitiesUnderTaken,
        nameOfOverseasEntity,
        dOIofOverseasEntity,
        natureOfActivitiesUnderTakenByOverseasEntity,
        natureOfEntityWOSorJV,
        detailsOfRemittanceSentandDateOfRemittanceandAmountInFCYandInINR,
        detailsOfOtherFinancialCommitment,
        detailsOfUINAppliedAndRecieved,
        dateOfReciept,
        approvalOfOtherRegulatorsIfRequired,
        detailsOfAPRSubmitted,
        natureOfContraventionsAndReasonForTheContravention,
        allSupportingDocumentsMayBeSubmitted
    } = req.body.odiDetails;
    
    await odiModel.findOne({
        odiCode
    })
    .then(async (odiDetails) => {
        if(odiDetails){
            return res.status(400).json({
                message: "User ID Already Exists"
            });
        }
        const newFdiDetails = new odiModel({
            odiCode,
            nameofApplicant,
            dateOfIncorporation,
            incomeTaxPan,
            natureOfActivitiesUnderTaken,
            nameOfOverseasEntity,
            dOIofOverseasEntity,
            natureOfActivitiesUnderTakenByOverseasEntity,
            natureOfEntityWOSorJV,
            detailsOfRemittanceSentandDateOfRemittanceandAmountInFCYandInINR,
            detailsOfOtherFinancialCommitment,
            detailsOfUINAppliedAndRecieved,
            dateOfReciept,
            approvalOfOtherRegulatorsIfRequired,
            detailsOfAPRSubmitted,
            natureOfContraventionsAndReasonForTheContravention,
            allSupportingDocumentsMayBeSubmitted
        });
        await newFdiDetails
        .save()
        .then(odiDetails => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully added FDI Details"
            }, null, 2));
        })
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.delete("/", async (req,res) => {
    let {
        odiCode
    } = req.body.odiDetails;

    await odiModel.findOneAndDelete({
        odiCode
    })
    .then(odiDetails=> {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Removed FDI Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.put("/", async (req, res) => {
    let {
        odiCode
    } = req.body.odiDetails;

    await odiModel.findOneAndUpdate({
        odiCode
    },{
        $set: req.body.odiDetails
    })
    .then(odiDetails => {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Updated FDI Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.get('/getAllFDI', async (req, res) => {
    await odiModel.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'SF_ODI_Details_ODI',
                localField: '_id',
                foreignField: 'userId',
                as: 'odi',
            },
        },
        {
            $unwind: {
                path: '$odi',
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $sort: {
                "odiCode": -1
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