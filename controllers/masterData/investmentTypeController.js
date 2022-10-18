const express = require("express");
const router = express.Router();
const config = require("../../config/config");
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const investmentTypeModel = require("../../models/masterData/investmentModel");
const auth = require('../../middleware/auth')

router.post("/", (req, res) => {
    let {
        investmentTypePartCode,
        investmentType
    } = req.body.investmentDetails;


    investmentTypeModel.findOne({
            investmentTypePartCode
        })
        .then(investment => {
            if (investment) {
                return res.status(400).json({
                    message: "investmentTypePartCode Already Exists"
                });
            }

            const newInvestment = new investmentTypeModel({
                investmentTypePartCode,
                investmentType
            });
            newInvestment
                .save()
                .then(investment => {
                    res.status(200).type('json').send(JSON.stringify({
                        // investment
                        message: "Successfully added investment Type Details"
                    }, null, 2));

                })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

router.delete("/", (req, res) => {
    let {
        investmentTypePartCode,
    } = req.body.investmentDetails;
  
  
    investmentModel.findOneAndDelete({
        investmentTypePartCode
      })
      .then(investment => {
        res.status(200).type('json').send(JSON.stringify({
          message: "Successfully Removed investment Details"
        }, null, 2));
      })
      .catch(error => {
        util.log(colors.red(error))
      })
  });


router.put("/", (req, res) => {
    let {
        investmentTypePartCode,
        investmentType
    } = req.body.investmentDetails;


    investmentTypeModel.findOneAndUpdate({
            investmentTypePartCode
        }, {
            $set: req.body.investmentDetails
        })
        .then(investment => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated investment Details"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

insertOrUpdateInvestmentData = async (req, res) => {
    let
      userId = req.params.userid;
    //   let partyCode = req.body.partyDetails.partyCode
    // console.log(userId)
  
          partyModel.findOneAndUpdate({
            userId
        }, {
            $set: req.body.investmentDetails
        }, {
            upsert: true,
            new: true,
            useFindAndModify: false
        }).then( party=> {
          res.status(200).type('json').send(JSON.stringify({
            message: "Successfully Added Investment Details"
          }, null, 2));
         } )      
        .catch(error => {
          util.log(colors.red(error))
        })
    
  
  }
  
  router.post("/:userid", (req, res) => {
    insertOrUpdateInvestmentData(req, res)
  })
  
  router.put("/:userid", (req, res) => {
    insertOrUpdateInvestmentData(req, res)
  })


router.get('/getAllinvestmentDetails', (req, res) => {
    investmentTypeModel.aggregate([{
                $match: {}
            },
            {
                $lookup: {
                    from: 'SF_investment_M',
                    localField: '_id',
                    foreignField: 'investmentid',
                    as: 'investment',
                },
            },
            {
                $unwind: {
                    path: "$investment",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $sort: {
                    "investment.investmentName": -1
                }
            },
            {
                $group: {
                    "_id": "$_id",
                    "investmentName": {
                        $first: "$investmentName"
                    },
                    "investment": {
                        $first: "$investment"
                    }
                }
            },
            {
                $project: {
                    "_id": 0,
                    "investment Name": "$investmentName",
                    "investment Code": "$client.name",
                    "investment Details": "$client.totalBill"
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