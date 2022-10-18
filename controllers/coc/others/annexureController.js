const express = require("express");
const router = express.Router();
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const annexuresModel = require("../../../models/coc/ecb/annexuresModel");
const auth = require('../../../middleware/auth');

router.post("/", async (req,res) => {
    let{
        annexuresCode,
        annexureCheckbox1,
        annexureCheckbox2,
        annexureCheckbox3,
        annexureCheckbox4,
        annexureCheckbox5,
        annexureCheckbox6,
        annexureCheckbox7,
        annexureCheckbox8,
        annexureCheckbox9,
        annexureCheckbox10,
        annexureCheckbox11,
        selectAnnexure1,
        selectAnnexure2,
        selectAnnexure3,
        selectAnnexure4,
        selectAnnexure5,
        selectAnnexure6,
        selectAnnexure7,
        selectAnnexure8,
        selectAnnexure9,
        selectAnnexure10,
        selectAnnexure11
    } = req.body.annexuresDetails;
    
    await annexuresModel.findOne({
        annexuresCode
    })
    .then(async (annexuresDetails) => {
        if(annexuresDetails){
            return res.status(400).json({
                message: "User ID Already Exists"
            });
        }
        const newAnnexuresDetails = new annexuresModel({
            annexuresCode,
            annexureCheckbox1,
            annexureCheckbox2,
            annexureCheckbox3,
            annexureCheckbox4,
            annexureCheckbox5,
            annexureCheckbox6,
            annexureCheckbox7,
            annexureCheckbox8,
            annexureCheckbox9,
            annexureCheckbox10,
            annexureCheckbox11,
            selectAnnexure1,
            selectAnnexure2,
            selectAnnexure3,
            selectAnnexure4,
            selectAnnexure5,
            selectAnnexure6,
            selectAnnexure7,
            selectAnnexure8,
            selectAnnexure9,
            selectAnnexure10,
            selectAnnexure11
        });
        await newAnnexuresDetails
        .save()
        .then(annexuresDetails => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully added Annexures Details"
            }, null, 2));
        })
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.delete("/", async (req,res) => {
    let {
        annexuresCode
    } = req.body.annexuresDetails;

    await annexuresModel.findOneAndDelete({
        annexuresCode
    })
    .then(annexuresDetails=> {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Removed Annexures Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.put("/", async (req, res) => {
    let {
        annexuresCode
    } = req.body.annexuresDetails;

    await annexuresModel.findOneAndUpdate({
        annexuresCode
    },{
        $set: req.body.annexuresDetails
    })
    .then(annexuresDetails => {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Updated Annexures Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.get('/getAllAnnexures', async (req, res) => {
    await annexuresModel.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'SF_Annexures_OTHERS',
                localField: '_id',
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
            $sort: {
                "annexuresCode": -1
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