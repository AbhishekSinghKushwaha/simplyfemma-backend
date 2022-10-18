const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const fdiModel = require("../../../models/coc/fdi/fdiModel");
const auth = require('../../../middleware/auth');

router.post("/", async (req,res) => {
    let{
        fdiCode,
        nameofApplicant,
        dateOfIncorporation,
        incomeTaxPan,
        natureOfActivitiesUnderTakenNicCode,
        briefParticularsAboutTheForeignInvestor,
        detailsOfForrignInwardRemittancesRecievedByApplicantCompanyFromDateOfIncorporationTillDate,
        copiesOfBalanceSheetDuringThePeriodOfReceiptOfShareApplicationMoney,
        natureOfContraventionAndReasonsForTheContravention,
        slNoTA,
        TAnameOfRemitter,
        TAtotalAmount,
        dateOfReportingRbiTA,
        reportRbiTA,
        TAdelayIfAny,
        TAtotal,
        TBnameOfInvestor,
        dateOfAllotmentOfSharesTB,
        TBnoOfSharesAlloted,
        TBamountForWhichSharesAlloted,
        dateOfReportingRBITB,
        TBdelayIfAny,
        TBtotal,
        TCslNo,
        TcnameOfRemitter,
        TCtotalAmountINR,
        dateOfRecieptTC,
        TCExcessShareApplicationMoney,
        dateOfRefundTC,
        TCamountInForex,
        rbiLetterTC,
        TCTotal,
        ACSlNo,
        dateTI,
        nameACenterAuthorizationZCapital,
        ACwithEffectFrom,
        ACdateOfBoardMeeting,
        dateOfFillingROC
    } = req.body.fdiDetails;
    
    await fdiModel.findOne({
        fdiCode
    })
    .then(async (fdiDetails) => {
        if(fdiDetails){
            return res.status(400).json({
                message: "User ID Already Exists"
            });
        }
        const newFdiDetails = new fdiModel({
            fdiCode,
            nameofApplicant,
            dateOfIncorporation,
            incomeTaxPan,
            natureOfActivitiesUnderTakenNicCode,
            briefParticularsAboutTheForeignInvestor,
            detailsOfForrignInwardRemittancesRecievedByApplicantCompanyFromDateOfIncorporationTillDate,
            copiesOfBalanceSheetDuringThePeriodOfReceiptOfShareApplicationMoney,
            natureOfContraventionAndReasonsForTheContravention,
            slNoTA,
            TAnameOfRemitter,
            TAtotalAmount,
            dateOfReportingRbiTA,
            reportRbiTA,
            TAdelayIfAny,
            TAtotal,
            TBnameOfInvestor,
            dateOfAllotmentOfSharesTB,
            TBnoOfSharesAlloted,
            TBamountForWhichSharesAlloted,
            dateOfReportingRBITB,
            TBdelayIfAny,
            TBtotal,
            TCslNo,
            TcnameOfRemitter,
            TCtotalAmountINR,
            dateOfRecieptTC,
            TCExcessShareApplicationMoney,
            dateOfRefundTC,
            TCamountInForex,
            rbiLetterTC,
            TCTotal,
            ACSlNo,
            dateTI,
            nameACenterAuthorizationZCapital,
            ACwithEffectFrom,
            ACdateOfBoardMeeting,
            dateOfFillingROC
        });
        await newFdiDetails
        .save()
        .then(fdiDetails => {
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
        fdiCode
    } = req.body.fdiDetails;

    await fdiModel.findOneAndDelete({
        fdiCode
    })
    .then(fdiDetails=> {
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
        fdiCode
    } = req.body.fdiDetails;

    await fdiModel.findOneAndUpdate({
        fdiCode
    },{
        $set: req.body.fdiDetails
    })
    .then(fdiDetails => {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Updated FDI Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.get('/getAllFDI', async (req, res) => {
    await fdiModel.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'SF_FDI',
                localField: '_id',
                foreignField: 'userId',
                as: 'fdi',
            },
        },
        {
            $unwind: {
                path: '$fdi',
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $sort: {
                "fdiCode": -1
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