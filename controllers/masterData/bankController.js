const express = require("express");
const router = express.Router();
const config = require("../../config/config");
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const bankModel = require("../../models/masterData/bankModel");
const userModel = require("../../models/userModel");
const auth = require('../../middleware/auth')


insertOrUpdate = async (req, res) => {
  let
    userId = req.params.userid;
  // console.log(userId)


  await userModel.findOne({
    userId
  }).then(user => {

        bankModel.findOneAndUpdate({
          userId,
      }, {
          $set: req.body.odiAllDetails.odiDetails
      }, {
          upsert: true,
          new: true,
          useFindAndModify: false
      })

      })
      .catch(error => {
        util.log(colors.red(error))
      })
  

}

router.post("/:userid", (req, res) => {
  insertOrUpdate(req, res)
})

router.put("/:userid", (req, res) => {
  insertOrUpdate(req, res)
})




// )

router.delete("/:userid", (req, res) => {
  let
    userId = req.params.userid;
  // console.log(userId)

  bankModel.findOneAndDelete({
      userId
    })
    .then(bank => {
      res.status(200).type('json').send(JSON.stringify({
        message: "Successfully Removed Bank Details"
      }, null, 2));
    })
    .catch(error => {
      util.log(colors.red(error))
    })
});

// router.put("/:userid", async (req, res) => {

//   let
//     userId = req.params.userid;

//   let {
//     bankCode,
//     bankName,
//     bankAddress
//   } = req.body.bankDetails;


//   await userModel.findOne({
//     userId
//   }).then(user => {
//     bankModel.findOneAndUpdate({
//         bankCode
//       }, {
//         $set: req.body.bankDetails
//       })
//       .then(bank => {
//         res.status(200).type('json').send(JSON.stringify({
//           message: "Successfully Updated Bank Details"
//         }, null, 2));
//       })
//       .catch(error => {
//         util.log(colors.red(error))
//       })
//   });
// });

router.get('/getAllBankDetails', (req, res) => {
  bankModel.aggregate([{
        $match: {}
      },
      {
        $lookup: {
          from: 'SF_Bank_M',
          localField: '_id',
          foreignField: 'bankid',
          as: 'bank',
        },
      },
      {
        $unwind: {
          path: "$bank",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          "bank.bankName": -1
        }
      },
      {
        $group: {
          "_id": "$_id",
          "bankName": {
            $first: "$bankName"
          },
          "bank": {
            $first: "$bank"
          }
        }
      },
      {
        $project: {
          "_id": 0,
          "Bank Name": "$bankName",
          "Bank Code": "$client.name",
          "Bank Details": "$client.totalBill"
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