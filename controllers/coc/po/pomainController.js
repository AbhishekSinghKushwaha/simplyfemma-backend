const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const async = require('async');
const jwt = require("jsonwebtoken");

const auth = require('../../../middleware/auth');
const entityDetailsModel = require("../../../models/coc/po/entityDetailsModel");
const compoundingDetailsModel = require("../../../models/coc/po/compoundingDetailsModel");
const compoundingSubmissionsModel = require("../../../models/coc/po/compoundingSubmissionsModel");
const poModel = require("../../../models/coc/po/poModel");
const annexuresModel = require("../../../models/coc/po/annexuresModel");
const authorisedSignatoryModel = require("../../../models/coc/po/authorisedSignatoryModel");

getPoDetail = async (req, res) => {
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
            poModel.findOne({
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

insertOrUpdatePoData = async (req, res) => {
    
    let userId = req.params.userid;
    async.series([
    
        function (callback) {

            entityDetailsModel.findOneAndUpdate({
                userId,
            }, {
                $set: req.body.poAllDetails.entityDetails
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
                $set: req.body.poAllDetails.compoundingDetails
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
                $set: req.body.poAllDetails.submissionDetails
            }, {
                upsert: true,
                new: true,
                useFindAndModify: false
            }, callback)
        },
        function (callback) {

            poModel.findOneAndUpdate({
                userId,
            }, {
                $set: req.body.poAllDetails.poDetails
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
                $set: req.body.poAllDetails.annexuresDetails
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
                $set: req.body.poAllDetails.authorisedSignatory
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

deletePoData = async (req, res) => {
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
            poModel.findOneAndDelete({
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
            message: "Successfully Removed PO Details"
        }, null, 2));
        if (err) {
            res.status(200).type('json').send(JSON.stringify({
                err
            }, null, 2));
        }
    });

}


router.delete("/:userid", async (req, res) => {
    await deletePoData(req, res)
})


router.get('/getAllPoDetails', async (req, res) => {
    await entityDetailsModel.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'SF_Compounding_Details_PO',
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
                from: 'SF_Compounding_Submissions_PO',
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
                from: 'SF_PO_Details_PO',
                localField: 'userId',
                foreignField: 'userId',
                as: 'po',
            },
        },
        {
            $unwind: {
                path: '$po',
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $lookup: {
                from: 'SF_Annexures_PO',
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
                from: 'SF_Authorised_Signatory_PO',
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
    await getPoDetail(req, res)
})

router.all("/:userid", async (req, res) => {
    await insertOrUpdatePoData(req, res)
})

module.exports = router;