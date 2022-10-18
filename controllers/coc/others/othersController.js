const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const othersModel = require("../../../models/coc/others/othersModel");
const auth = require('../../../middleware/auth');

router.post("/", async (req,res) => {
    let{
        othersCode,
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
    } = req.body.othersDetails;
    
    await othersModel.findOne({
        othersCode
    })
    .then(async (othersDetails) => {
        if(othersDetails){
            return res.status(400).json({
                message: "User ID Already Exists"
            });
        }
        const newEcbDetails = new othersModel({
            othersCode,
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
        await newEcbDetails
        .save()
        .then(othersDetails => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully added OTHERS Details"
            }, null, 2));
        })
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.delete("/", async (req,res) => {
    let {
        othersCode
    } = req.body.othersDetails;

    await othersModel.findOneAndDelete({
        othersCode
    })
    .then(othersDetails=> {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Removed OTHERS Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.put("/", async (req, res) => {
    let {
        othersCode
    } = req.body.othersDetails;

    await othersModel.findOneAndUpdate({
        othersCode
    },{
        $set: req.body.othersDetails
    })
    .then(othersDetails => {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Updated OTHERS Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.get('/getAllOTHERS', async (req, res) => {
    await othersModel.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'SF_OTHERS_Details_OTHERS',
                localField: '_id',
                foreignField: 'userId',
                as: 'others',
            },
        },
        {
            $unwind: {
                path: '$others',
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $sort: {
                "othersCode": -1
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