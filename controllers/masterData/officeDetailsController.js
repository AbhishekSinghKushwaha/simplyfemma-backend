const express = require("express");
const router = express.Router();
const config = require("../../config/config");
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const officeDetailsModel = require("../../models/masterData/officeDetailsModel");
const auth = require('../../middleware/auth')

router.post("/", async (req, res) => {
    let {
        officeCode,
        officeEmailAddress,
        mobileNo,
        officeTelNo,
        officeFaxNo,
        codBuildingNo,
        floorNo,
        nameOfPremises,
        street,
        city,
        state,
        pincode,
        legalNameOfBusiness,
        dateOfIncorporation,
        panNo,
        cinNo
    } = req.body.officeDetails;


    await officeDetailsModel.findOne({
        officeCode
        })
        .then(async (officedetails) => {
            if (officedetails) {
                return res.status(400).json({
                    message: "OfficeCode Already Exists"
                });
            }

            const newOfficeDetails = new officeDetailsModel({
                officeCode,
                officeEmailAddress,
                mobileNo,
                officeTelNo,
                officeFaxNo,
                codBuildingNo,
                floorNo,
                nameOfPremises,
                street,
                city,
                state,
                pincode,
                legalNameOfBusiness,
                dateOfIncorporation,
                panNo,
                cinNo
            });
            await newOfficeDetails
                .save()
                .then(officedetails => {
                    res.status(200).type('json').send(JSON.stringify({
                        // investment
                        message: "Successfully added office Details"
                    }, null, 2));

                })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

router.delete("/", async (req,res) => {
    let {
        officeCode
    } = req.body.officeDetails;

    await officeDetailsModel.findOneAndDelete({
        officeCode
    })
    .then(officedetails=> {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Removed Office Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.put("/", async (req, res) => {
    let {
        officeCode
    } = req.body.officeDetails;

    await officeDetailsModel.findOneAndUpdate({
        officeCode
    },{
        $set: req.body.officeDetails
    })
    .then(officedetails => {
        res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Updated Office Details"
        }, null, 2));
    })
    .catch(error => {
        util.log(colors.red(error))
    })
});

router.get('/getAllOfficeDetails', async (req, res) => {
    await officeDetailsModel.aggregate([{
          $match: {}
        },
        {
          $lookup: {
            from: 'SF_Office_Details',
            localField: '_id',
            foreignField: 'userId',
            as: 'party',
          },
        },
        {
          $unwind: {
            path: "$party",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $sort: {
            "officeCode": -1
          }
        }
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
  
  module.exports = router;