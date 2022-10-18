const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const async = require('async');
const jwt = require("jsonwebtoken");

const auth = require('../../../middleware/auth');
const entityDetailsModel = require("../../../models/coc/bo/entityDetailsModel");
const compoundingDetailsModel = require("../../../models/coc/bo/compoundingDetailsModel");
const compoundingSubmissionsModel = require("../../../models/coc/bo/compoundingSubmissionsModel");
const boModel = require("../../../models/coc/bo/boModel");
const annexuresModel = require("../../../models/coc/bo/annexuresModel");
const authorisedSignatoryModel = require("../../../models/coc/bo/authorisedSignatoryModel");

getBoDetail = async (req, res) => {
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
            boModel.findOne({
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

insertOrUpdateBoData = async (req, res) => {
    
    let userId = req.params.userid;
    async.series([
    
        function (callback) {

            entityDetailsModel.findOneAndUpdate({
                userId,
            }, {
                $set: req.body.boAllDetails.entityDetails
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
                $set: req.body.boAllDetails.compoundingDetails
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
                $set: req.body.boAllDetails.submissionDetails
            }, {
                upsert: true,
                new: true,
                useFindAndModify: false
            }, callback)
        },
        function (callback) {

            boModel.findOneAndUpdate({
                userId,
            }, {
                $set: req.body.boAllDetails.boDetails
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
                $set: req.body.boAllDetails.annexuresDetails
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
                $set: req.body.boAllDetails.authorisedSignatory
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

deleteBoData = async (req, res) => {
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
            boModel.findOneAndDelete({
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
            message: "Successfully Removed BO Details"
        }, null, 2));
        if (err) {
            res.status(200).type('json').send(JSON.stringify({
                err
            }, null, 2));
        }
    });

}


router.delete("/:userid", async (req, res) => {
    await deleteBoData(req, res)
})


router.get('/getAllBoDetails', async (req, res) => {
    await entityDetailsModel.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'SF_Compounding_Details_BO',
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
                from: 'SF_Compounding_Submissions_BO',
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
                from: 'SF_BO_Details_BO',
                localField: 'userId',
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
            $lookup: {
                from: 'SF_Annexures_BO',
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
                from: 'SF_Authorised_Signatory_BO',
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
    await getBoDetail(req, res)
})

router.all("/:userid", async (req, res) => {
    await insertOrUpdateBoData(req, res)
})

module.exports = router;