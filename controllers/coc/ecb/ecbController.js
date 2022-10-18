const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const ecbModel = require("../../../models/coc/ecb/ecbModel");
const auth = require('../../../middleware/auth');

router.post("/", async (req,res) => {
    let{
        ecbCode,
        nameOfApplicant,
        dateOfIncorporation,
        incomeTaxPan,
        natureOfActivitiesUnderTakenNicCode,
        briefParticularsAboutTheForeignLender,
        isTheApplicantAnEligibleBorrower,
        isTheLenderEligiblrLender,
        isTheLenderAnEquityHolder,
        whatisTheLevelOfHisHoldingAtTheTimeOfLoanAgreement,
        dateOfIncorporation2,
        amountInForeign,
        rateOfInterest,
        periodOfLoan,
        dateOfDrawDown,
        amountInForeignCurrency,
        amountInInr,
        detailsOfDrawDown,
        detailsOfLRNno,
        detailsOfEcb2returnsSubmittedandPeriodOfReturnandDateOfSubmission,
        detailsOfUtilizationOfEcbInForeignCurrencyAndIndianRupee,
        natureOfContraventionandReasonsForTheContravention,
        allSupportingDocumentsMatBeSubmitted
    } = req.body.ecbDetails;
    
    await ecbModel.findOne({
        ecbCode
    })
    .then(async (ecbDetails) => {
        if(ecbDetails){
            return res.status(400).json({
                message: "User ID Already Exists"
            });
        }
        const newEcbDetails = new ecbModel({
            ecbCode,
            nameOfApplicant,
            dateOfIncorporation,
            incomeTaxPan,
            natureOfActivitiesUnderTakenNicCode,
            briefParticularsAboutTheForeignLender,
            isTheApplicantAnEligibleBorrower,
            isTheLenderEligiblrLender,
            isTheLenderAnEquityHolder,
            whatisTheLevelOfHisHoldingAtTheTimeOfLoanAgreement,
            dateOfIncorporation2,
            amountInForeign,
            rateOfInterest,
            periodOfLoan,
            dateOfDrawDown,
            amountInForeignCurrency,
            amountInInr,
            detailsOfDrawDown,
            detailsOfLRNno,
            detailsOfEcb2returnsSubmittedandPeriodOfReturnandDateOfSubmission,
            detailsOfUtilizationOfEcbInForeignCurrencyAndIndianRupee,
            natureOfContraventionandReasonsForTheContravention,
            allSupportingDocumentsMatBeSubmitted
        });
        await newEcbDetails
        .save()
        .then(ecbDetails => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully added ECB Details"
            }, null, 2));
        })
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.delete("/", async (req,res) => {
    let {
        ecbCode
    } = req.body.ecbDetails;

    await ecbModel.findOneAndDelete({
        ecbCode
    })
    .then(ecbDetails=> {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Removed ECB Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.put("/", async (req, res) => {
    let {
        ecbCode
    } = req.body.ecbDetails;

    await ecbModel.findOneAndUpdate({
        ecbCode
    },{
        $set: req.body.ecbDetails
    })
    .then(ecbDetails => {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Updated ECB Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.get('/getAllECB', async (req, res) => {
    await ecbModel.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'SF_ECB_Details_ECB',
                localField: '_id',
                foreignField: 'userId',
                as: 'ecb',
            },
        },
        {
            $unwind: {
                path: '$ecb',
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $sort: {
                "ecbCode": -1
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