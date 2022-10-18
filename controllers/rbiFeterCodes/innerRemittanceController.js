const express = require("express");
const router = express.Router();
const innerRemittanceModel = require("../../models/rbiFeterCodes/innerRemittance");
var ObjectId = require('mongoose').Types.ObjectId;

router.post("/", async(req, res) => {

    innerRemittanceModel.insertMany(req.body, function (err, docs) {
        if (err){ 
            res.status(500).send({message:err.message,success:false});
            console.log('Error in inserting the data :' + JSON.stringify(err, undefined, 2)); 
        } 
        else {
            res.send(docs);
            console.log("Multiple records inserted to collection");
        }
      });

})

router.get('/', async (req, res)=>{
    await innerRemittanceModel.find((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }	
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});

router.put('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    
    var innerremittance = {
        gr_no : req.body.gr_no,
        purposeGroupName : req.body.purposeGroupName,
        purposeCode : req.body.purposeCode,
        description : req.body.description
    };   

    innerRemittanceModel.findOneAndUpdate(req.params.id,
        {$set:innerremittance},
        {new:true}, 
        (err,doc)=>{
        if(!err) {res.send(doc);}
        else {console.log('Error in innerremittance update:'+JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;