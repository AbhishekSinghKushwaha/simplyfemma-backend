const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const compoundingDetailsModel = require("../../../models/coc/fdi/compoundingDetailsModel");
const auth = require('../../../middleware/auth');

router.post("/", async (req,res) => {
    let{
        compoundingCode,
        natureOfContravention,
        selectFemaReg,
        selectFemaNo,
        topicNameDescription,
        sample_others_1,
        sample_others_2,
        sample_others_3,
        selectcAAoption,
        selectCentralOptions,
        subjectOfCompounding,
        sample_subjectOfCompounding_1,
        sample_subjectOfCompounding_2,
        sample_subjectOfCompounding_3,
        rbiReferenceLetter,
        sample_rbi_1,
        sample_rbi_2,
        sample_rbi_3,
        residentOutsideIndia,
        sample_indiaOrNot_1,
        sample_indiaOrNot_2,
        sample_indiaOrNot_3,
        nameOfAdjudicatingAuthority,
        compoundingApplicationFee,
        dateOfIncorporation,
        inFavour,
        officeTeleNumber,
        selectPayOption
    } = req.body.compoundingDetails;
    
    await compoundingDetailsModel.findOne({
        compoundingCode
    })
    .then(async (compoundingDetails) => {
        if(compoundingDetails){
            return res.status(400).json({
                message: "User ID Already Exists"
            });
        }
        const newCompoundingDetails = new compoundingDetailsModel({
            compoundingCode,
            natureOfContravention,
            selectFemaReg,
            selectFemaNo,
            topicNameDescription,
            sample_others_1,
            sample_others_2,
            sample_others_3,
            selectcAAoption,
            selectCentralOptions,
            subjectOfCompounding,
            sample_subjectOfCompounding_1,
            sample_subjectOfCompounding_2,
            sample_subjectOfCompounding_3,
            rbiReferenceLetter,
            sample_rbi_1,
            sample_rbi_2,
            sample_rbi_3,
            residentOutsideIndia,
            sample_indiaOrNot_1,
            sample_indiaOrNot_2,
            sample_indiaOrNot_3,
            nameOfAdjudicatingAuthority,
            compoundingApplicationFee,
            dateOfIncorporation,
            inFavour,
            officeTeleNumber,
            selectPayOption
        });
        await newCompoundingDetails
        .save()
        .then(compoundingDetails => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully added Compounding Details"
            }, null, 2));
        })
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.delete("/", async (req,res) => {
    let {
        compoundingCode
    } = req.body.compoundingDetails;

    await compoundingDetailsModel.findOneAndDelete({
        compoundingCode
    })
    .then(compoundingDetails=> {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Removed Compounding Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.put("/", async (req, res) => {
    let {
        compoundingCode
    } = req.body.compoundingDetails;

    await compoundingDetailsModel.findOneAndUpdate({
        compoundingCode
    },{
        $set: req.body.compoundingDetails
    })
    .then(compoundingDetails => {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Updated Compounding Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.get('/getAllCompoundingDetails', async (req, res) => {
    await compoundingDetailsModel.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'SF_Compounding_Details_FDI',
                localField: '_id',
                foreignField: 'userId',
                as: 'compoundingdetail',
            },
        },
        {
            $unwind: {
                path: '$compoundingdetail',
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $sort: {
                "compoundingCode": -1
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