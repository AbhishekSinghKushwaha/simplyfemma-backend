const express = require("express");
const router = express.Router();
const config = require("../../config/config");
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const investigationModel = require("../../models/masterData/investigationModel");
const auth = require('../../middleware/auth')

router.post("/", (req, res) => {
    let {
        investigationAgencyCode,
        investigationAgencyName,
        investigationFromDate,
        investigationtoDate,
    } = req.body.investigationDetails;


    investigationModel.findOne({
            investigationAgencyCode
        })
        .then(investigation => {
            if (investigation) {
                return res.status(400).json({
                    message: "investigationAgencyCode Already Exists"
                });
            }

            const newInvestigationData = new investigationModel({
                investigationAgencyCode,
                investigationAgencyName,
                investigationFromDate,
                investigationtoDate,
            });
            newInvestigationData
                .save()
                .then(investigation => {
                    res.status(200).type('json').send(JSON.stringify({
                        // investigation
                        message: "Successfully added investigation"
                    }, null, 2));

                })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

// });

router.put("/", (req, res) => {
    let {
        investigationAgencyCode,
        investigationAgencyName,
        investigationFromDate,
        investigationtoDate,
    } = req.body.investigationDetails;


    investigationModel.findOneAndUpdate({
            investigationAgencyCode
        }, {
            $set: req.body.investigationDetails
        })
        .then(investigation => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated investigation Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

router.delete("/", (req, res) => {
    let {
        investigationAgencyCode,
    } = req.body.investigationDetails;


    investigationModel.findOneAndDelete({
            investigationAgencyCode
        })
        .then(investigation => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Removed investigation Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});



insertOrUpdateInvestigationData = async (req, res) => {
    let
      userId = req.params.userid;
    //   let partyCode = req.body.partyDetails.partyCode
    // console.log(userId)
  
          partyModel.findOneAndUpdate({
            userId
        }, {
            $set: req.body.investigationDetails
        }, {
            upsert: true,
            new: true,
            useFindAndModify: false
        }).then( party=> {
          res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Added Party Details"
          }, null, 2));
         } )      
        .catch(error => {
          util.log(colors.red(error))
        })
    
  
  }
  
  router.post("/:userid", (req, res) => {
    insertOrUpdateInvestigationData(req, res)
  })
  
  router.put("/:userid", (req, res) => {
    insertOrUpdateInvestigationData(req, res)
  })
  


router.get('/getAllinvestigationDetails', (req, res) => {
    investigationModel.aggregate([{
                $match: {}
            },
            {
                $lookup: {
                    from: 'SF_investigation_M',
                    localField: '_id',
                    foreignField: 'investigationid',
                    as: 'investigation',
                },
            },
            {
                $unwind: {
                    path: "$investigation",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $sort: {
                    "investigation.investigationName": -1
                }
            },
            {
                $group: {
                    "_id": "$_id",
                    "investigationName": {
                        $first: "$investigationName"
                    },
                    "investigation": {
                        $first: "$investigation"
                    }
                }
            },
            {
                $project: {
                    "_id": 0,
                    "investigation Name": "$investigationName",
                    "investigation Code": "$client.name",
                    "investigation Details": "$client.totalBill"
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