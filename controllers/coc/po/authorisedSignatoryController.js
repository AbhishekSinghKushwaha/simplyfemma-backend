const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const authorisedSignatoryModel = require("../../../models/coc/po/authorisedSignatoryModel");
const auth = require('../../../middleware/auth');

router.post("/", async (req,res) => {
    let{
        authorisedCode,
        nameOfThePerson,
        addressOfThePerson,
        panNumber,
        designationOrStatus
    } = req.body.authorisedSignatory;
    
    await authorisedSignatoryModel.findOne({
        authorisedCode
    })
    .then(async (authorisedSignatory) => {
        if(authorisedSignatory){
            return res.status(400).json({
                message: "User ID Already Exists"
            });
        }
        const newauthorisedSignatory = new authorisedSignatoryModel({
            authorisedCode,
            nameOfThePerson,
            addressOfThePerson,
            panNumber,
            designationOrStatus
        });
        await newauthorisedSignatory
        .save()
        .then(authorisedSignatory => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully added Authorised Signatory Details"
            }, null, 2));
        })
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.delete("/", async (req,res) => {
    let {
        authorisedCode
    } = req.body.authorisedSignatory;

    await authorisedSignatoryModel.findOneAndDelete({
        authorisedCode
    })
    .then(authorisedSignatory=> {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Removed Authorised Signatory Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.put("/", async (req, res) => {
    let {
        authorisedCode
    } = req.body.authorisedSignatory;

    await authorisedSignatoryModel.findOneAndUpdate({
        authorisedCode
    },{
        $set: req.body.authorisedSignatory
    })
    .then(authorisedSignatory => {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Updated Authorised Signatory Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.get('/getAllAuthorisedSignatory', async (req, res) => {
    await authorisedSignatoryModel.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'SF_Authorised_Signatory_PO',
                localField: '_id',
                foreignField: 'userId',
                as: 'authorised',
            },
        },
        {
            $unwind: {
                path: '$authorised',
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $sort: {
                "authorisedCode": -1
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