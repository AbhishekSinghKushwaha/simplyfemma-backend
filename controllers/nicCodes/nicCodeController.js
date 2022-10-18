const express = require("express");
const router = express.Router();
const nicCodeModel = require("../../models/nicCodes/nicCode");
var ObjectId = require('mongoose').Types.ObjectId;

router.post("/", async(req, res) => {

    nicCodeModel.insertMany(req.body, function (err, docs) {
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
    await nicCodeModel.find((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }	
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});


router.put('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    
    var niccode = {
        policy : req.body.policy,
        sector : req.body.sector,
        equity : req.body.equity,
        entryRoute : req.body.entryRoute,
        otherConditions : req.body.otherConditions,
        nic : req.body.nic,
    };   

    nicCodeModel.findOneAndUpdate(req.params.id,
        {$set:niccode},
        {new:true}, 
        (err,doc)=>{
        if(!err) {res.send(doc);}
        else {console.log('Error in niccode update:'+JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;