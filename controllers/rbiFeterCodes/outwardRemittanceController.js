const express = require("express");
const router = express.Router();
const outwardRemittanceModel = require("../../models/rbiFeterCodes/outwardRemittance");
var ObjectId = require('mongoose').Types.ObjectId;

router.post("/", async(req, res) => {

    outwardRemittanceModel.insertMany(req.body, function (err, docs) {
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
    await outwardRemittanceModel.find((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }	
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});

router.put('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    
    var outwardremittance = {
        gr_no : req.body.gr_no,
        purposeGroupName : req.body.purposeGroupName,
        purposeCode : req.body.purposeCode,
        description : req.body.description
    };   

    outwardRemittanceModel.findOneAndUpdate(req.params.id,
        {$set:outwardremittance},
        {new:true}, 
        (err,doc)=>{
        if(!err) {res.send(doc);}
        else {console.log('Error in outwardRemittance update:'+JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;