const express = require("express");
const router = express.Router();
const config = require("../../config/config");
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const partyModel = require("../../models/masterData/partyModel");
const auth = require('../../middleware/auth')

router.post("/", (req, res) => {
  let {
    partyCode,
    partyName,
    partyAddress,
    panNumber,
    partyStatus,
    signatoryName,
    signatoryDesignation,
    signatoryTelNo,
    signatoryFaxNo,
    auditorFirmName,
    auditorFirmRegNumber,
    partyGroup,
    activityCodeIP,
    addressIP,
    city,
    state,
    pin,
    contactPersonName,
    contactPersonDesignation,
    contactPersonTelno,
    contactPersonFaxno,
    contactPersonMobile,
    contactPersonEmailId,

  } = req.body.partyDetails;

  partyModel.findOne({
      partyCode
    })
    .then(party => {
      if (party) {
        return res.status(400).json({
          message: "Party Code Already Exists"
        });
      }

      const newParty = new partyModel({
        partyCode,
        partyName,
        partyAddress,
        panNumber,
        partyStatus,
        signatoryName,
        signatoryDesignation,
        signatoryTelNo,
        signatoryFaxNo,
        auditorFirmName,
        auditorFirmRegNumber,
        partyGroup,
        activityCodeIP,
        addressIP,
        city,
        state,
        pin,
        contactPersonName,
        contactPersonDesignation,
        contactPersonTelno,
        contactPersonFaxno,
        contactPersonMobile,
        contactPersonEmailId,
      });
      newParty
        .save()
        .then(party => {
          res.status(200).type('json').send(JSON.stringify({
            // party
            message: "Successfully added Party"
          }, null, 2));
          //   jwt.sign({
          //       id: party.id
          //     },
          //     config.jwtSecret, {
          //       expiresIn: 1036800
          //     },
          //     (error, token) => {
          //       if (error) throw error;

          //  
          //     }
          //   );
        })
    })
    .catch(error => {
      util.log(colors.red(error))
    })
});


router.put("/", (req, res) => {
  let {
    partyCode,
  } = req.body.partyDetails;


  partyModel.findOneAndUpdate({
      partyCode
    }, {
      $set: req.body.partyDetails
    })
    .then(party => {
      res.status(200).type('json').send(JSON.stringify({
        message: "Successfully Updated Party Details"
      }, null, 2));
    })
    .catch(error => {
      util.log(colors.red(error))
    })
});



router.delete("/", (req, res) => {
  let {
    partyCode,
  } = req.body.partyDetails;


  partyModel.findOneAndDelete({
      partyCode
    })
    .then(party => {
      res.status(200).type('json').send(JSON.stringify({
        message: "Successfully Removed Party Details"
      }, null, 2));
    })
    .catch(error => {
      util.log(colors.red(error))
    })
});


insertOrUpdateBankData = async (req, res) => {
  let
    userId = req.params.userid;
    let partyCode = req.body.partyDetails.partyCode
  // console.log(userId)

        partyModel.findOneAndUpdate({
          userId,partyCode
      }, {
          $set: req.body.partyDetails
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
  insertOrUpdateBankData(req, res)
})

router.put("/:userid", (req, res) => {
  insertOrUpdateBankData(req, res)
})


router.get('/getAllPartyDetails', (req, res) => {
  partyModel.aggregate([{
        $match: {}
      },
      {
        $lookup: {
          from: 'SF_Party_M',
          localField: '_id',
          foreignField: 'partyid',
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
          "party.partyName": -1
        }
      },
      {
        $group: {
          "_id": "$_id",
          "partyName": {
            $first: "$partyName"
          },
          "party": {
            $first: "$party"
          }
        }
      },
      {
        $project: {
          "_id": 0,
          "Party Name": "$partyName",
          "Party Code": "$client.name",
          "Party Details": "$client.totalBill"
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