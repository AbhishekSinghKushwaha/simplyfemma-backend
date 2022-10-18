const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const compoundingSubmissionsModel = require("../../../models/coc/fdi/compoundingSubmissionsModel");
const auth = require('../../../middleware/auth');

router.post("/", async (req,res) => {
    let{
        submissionCode,
            background_input,
            transactionDetails,
            natureofcontraventions_input,
            delayreasons_input,
            petitionrequest_input,
            letterOfAuthority,
            sample1,
            sample2,
            sample3,
            sample4
    } = req.body.submissionDetails;
    
    await compoundingSubmissionsModel.findOne({
        submissionCode
    })
    .then(async (submissionDetails) => {
        if(submissionDetails){
            return res.status(400).json({
                message: "User ID Already Exists"
            });
        }
        const newSubmissionDetails = new compoundingSubmissionsModel({
            submissionCode,
            background_input,
            transactionDetails,
            natureofcontraventions_input,
            delayreasons_input,
            petitionrequest_input,
            letterOfAuthority,
            sample1,
            sample2,
            sample3,
            sample4
        });
        await newSubmissionDetails
        .save()
        .then(submissionDetails => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully added Compounding Submissions Details"
            }, null, 2));
        })
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.delete("/", async (req,res) => {
    let {
        submissionCode
    } = req.body.submissionDetails;

    await compoundingSubmissionsModel.findOneAndDelete({
        submissionCode
    })
    .then(submissionDetails=> {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Removed Compounding Submissions Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.put("/", async (req, res) => {
    let {
        submissionCode
    } = req.body.submissionDetails;

    await compoundingSubmissionsModel.findOneAndUpdate({
        submissionCode
    },{
        $set: req.body.submissionDetails
    })
    .then(submissionDetails => {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Updated Compounding Submissions Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.get('/getAllCompoundingSubmissions', async (req, res) => {
    await compoundingSubmissionsModel.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'SF_Compounding_Submissions_FDI',
                localField: '_id',
                foreignField: 'userId',
                as: 'compoundingsubmissions',
            },
        },
        {
            $unwind: {
                path: '$compoundingsubmissions',
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $sort: {
                "submissionCode": -1
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