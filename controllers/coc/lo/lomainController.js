const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const async = require('async');
const jwt = require("jsonwebtoken");

const auth = require('../../../middleware/auth');
const entityDetailsModel = require("../../../models/coc/lo/entityDetailsModel");
const compoundingDetailsModel = require("../../../models/coc/lo/compoundingDetailsModel");
const compoundingSubmissionsModel = require("../../../models/coc/lo/compoundingSubmissionsModel");
const loModel = require("../../../models/coc/lo/loModel");
const annexuresModel = require("../../../models/coc/lo/annexuresModel");
const authorisedSignatoryModel = require("../../../models/coc/lo/authorisedSignatoryModel");

getLoDetail = async (req, res) => {
    let userId = req.params.userid;
    let hiddenResponseVariables = {
        _id: 0,
        "__v": 0,
        "updatedAt": 0,
        "createdAt": 0
    }

    async.series([
        function (callback) {
            entityDetailsModel.findOne({
                userId,
            }, hiddenResponseVariables, callback)
        },
        function (callback) {
            compoundingDetailsModel.findOne({
                userId,
            }, hiddenResponseVariables, callback)
        },
        function (callback) {
            compoundingSubmissionsModel.findOne({
                userId,
            }, hiddenResponseVariables, callback)
        },
        function (callback) {
            loModel.findOne({
                userId,
            }, hiddenResponseVariables, callback)
        },
        function (callback) {
            annexuresModel.findOne({
                userId,
            }, hiddenResponseVariables, callback)
        },
        function (callback) {
            authorisedSignatoryModel.findOne({
                userId,
            }, hiddenResponseVariables, callback)
        }
    ],
    function (err, entityData) {
        res.status(200).type('json').send(JSON.stringify({
            entityData,
        }, null, 2));
        if (err) {
            res.status(200).type('json').send(JSON.stringify({
                err
            }, null, 2));
        }
    });
}

insertOrUpdateLoData = async (req, res) => {
    
    let userId = req.params.userid;
    async.series([
    
        function (callback) {

            entityDetailsModel.findOneAndUpdate({
                userId,
            }, {
                $set: req.body.loAllDetails.entityDetails
            }, {
                upsert: true,
                new: true,
                useFindAndModify: false
            }, callback)
        },
        function (callback) {

            compoundingDetailsModel.findOneAndUpdate({
                userId,
            }, {
                $set: req.body.loAllDetails.compoundingDetails
            }, {
                upsert: true,
                new: true,
                useFindAndModify: false
            }, callback)
        },
        function (callback) {

            compoundingSubmissionsModel.findOneAndUpdate({
                userId,
            }, {
                $set: req.body.loAllDetails.submissionDetails
            }, {
                upsert: true,
                new: true,
                useFindAndModify: false
            }, callback)
        },
        function (callback) {

            loModel.findOneAndUpdate({
                userId,
            }, {
                $set: req.body.loAllDetails.loDetails
            }, {
                upsert: true,
                new: true,
                useFindAndModify: false
            }, callback)
        },
        function (callback) {

            annexuresModel.findOneAndUpdate({
                userId,
            }, {
                $set: req.body.loAllDetails.annexuresDetails
            }, {
                upsert: true,
                new: true,
                useFindAndModify: false
            }, callback)
        },
        function (callback) {

            authorisedSignatoryModel.findOneAndUpdate({
                userId,
            }, {
                $set: req.body.loAllDetails.authorisedSignatory
            }, {
                upsert: true,
                new: true,
                useFindAndModify: false
            }, callback)
        }
    ],
    function (err, results) {
        res.status(200).type('json').send(JSON.stringify({
            results,
        }, null, 2));
        if (err) {
            res.status(200).type('json').send(JSON.stringify({
                err
            }, null, 2));
        }
    });
}

deleteLoData = async (req, res) => {
    let userId = req.params.userid;

    async.series([
        function (callback) {
            entityDetailsModel.findOneAndDelete({
                userId,
            },callback)
        },
        function (callback) {
            compoundingDetailsModel.findOneAndDelete({
                userId,
            },callback)
        },
        function (callback) {
            compoundingSubmissionsModel.findOneAndDelete({
                userId,
            },callback)
        },
        function (callback) {
            loModel.findOneAndDelete({
                userId,
            },callback)
        },
        function (callback) {
            annexuresModel.findOneAndDelete({
                userId,
            },callback)
        },
        function (callback) {
            authorisedSignatoryModel.findOneAndDelete({
                userId,
            },callback)
        }
    ],
    function (err) {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Removed LO Details"
        }, null, 2));
        if (err) {
            res.status(200).type('json').send(JSON.stringify({
                err
            }, null, 2));
        }
    });

}


router.delete("/:userid", async (req, res) => {
    await deleteLoData(req, res)
})


router.get('/getAllLoDetails', async (req, res) => {
    await entityDetailsModel.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'SF_Compounding_Details_LO',
                localField: 'userId',
                foreignField: 'userId',
                as: 'compoundingdetails',
            },
        },
        {
            $unwind: {
                path: '$compoundingdetails',
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $lookup: {
                from: 'SF_Compounding_Submissions_LO',
                localField: 'userId',
                foreignField: 'userId',
                as: 'compoundingsubmission',
            },
        },
        {
            $unwind: {
                path: '$compoundingsubmission',
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $lookup: {
                from: 'SF_LO_Details_LO',
                localField: 'userId',
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
            $lookup: {
                from: 'SF_Annexures_LO',
                localField: 'userId',
                foreignField: 'userId',
                as: 'annexures',
            },
        },
        {
            $unwind: {
                path: '$annexures',
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $lookup: {
                from: 'SF_Authorised_Signatory_LO',
                localField: 'userId',
                foreignField: 'userId',
                as: 'authorisedsignatory',
            },
        },
        {
            $unwind: {
                path: '$authorisedsignatory',
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $sort: {
                "applicantName": -1
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
})

router.get("/:userid", async (req, res) => {
    await getLoDetail(req, res)
})

router.all("/:userid", async (req, res) => {
    await insertOrUpdateLoData(req, res)
})

module.exports = router;