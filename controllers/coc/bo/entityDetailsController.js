const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const entityDetailsModel = require("../../../models/coc/bo/entityDetailsModel");
const auth = require('../../../middleware/auth');

router.post("/", async (req, res) => {
    let {
        entityCode,
        legalNameOfBusiness,
        dateOfIncorporation,
        CINnumber,
        PANnumber,
        selectNicOption,
        mainActivities,
        additionalActivities,
        selectActivityOption,
        buildingNumber,
        floorNumber,
        nameOfThePremisesOrBuilding,
        roadOrStreet,
        area,
        cityOrTownOrLocalityOrVillage,
        state,
        country,
        pincode,
        officeEmailAddress,
        mobileNumber,
        officeTelephoneNumber,
        officeFaxNumber
    } = req.body.entityDetails;

    await entityDetailsModel.findOne({
        entityCode
    })
    .then(async (entityDetails) => {
        if (entityDetails) {
            return res.status(400).json({
                message: "User ID Already Exists"
            });
        }

        const newEntityDetails = new entityDetailsModel({
            entityCode,
            legalNameOfBusiness,
            dateOfIncorporation,
            CINnumber,
            PANnumber,
            selectNicOption,
            mainActivities,
            additionalActivities,
            selectActivityOption,
            buildingNumber,
            floorNumber,
            nameOfThePremisesOrBuilding,
            roadOrStreet,
            area,
            cityOrTownOrLocalityOrVillage,
            state,
            country,
            pincode,
            officeEmailAddress,
            mobileNumber,
            officeTelephoneNumber,
            officeFaxNumber
        });
        await newEntityDetails
        .save()
        .then(entityDetails=> {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully added Entity Details"
            }, null, 2));

        })
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.delete("/", async (req,res) => {
    let {
        entityCode
    } = req.body.entityDetails;

    await entityDetailsModel.findOneAndDelete({
        entityCode
    })
    .then(entityDetails=> {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Removed Entity Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.put("/", async (req, res) => {
    let {
        entityCode
    } = req.body.entityDetails;

    await entityDetailsModel.findOneAndUpdate({
        entityCode
    },{
        $set: req.body.entityDetails
    })
    .then(entityDetails => {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Updated Entity Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.get('/getAllEntityDetails', async (req, res) => {
    await entityDetailsModel.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'SF_Entity_Details_BO',
                localField: '_id',
                foreignField: 'userId',
                as: 'entitydetail',
            },
        },
        {
            $unwind: {
                path: '$entitydetail',
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
});

module.exports = router;