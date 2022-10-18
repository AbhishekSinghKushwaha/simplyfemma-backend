const express = require("express");
const router = express.Router();
const nicCode1987Model = require("../../models/nicCodes/nicCode1987");
var ObjectId = require('mongoose').Types.ObjectId;

router.post("/", async(req, res) => {

    nicCode1987Model.insertMany(req.body, function (err, docs) {
        if (err){ 
            res.status(500).send({message:err.message,success:false});
            console.log('Error in inserting the data :' + JSON.stringify(err, undefined, 2)); 
        } else {
            res.send(docs);
            console.log("Multiple documents inserted to Collection");
        }
      });

})

router.get('/', async (req, res)=>{
    await nicCode1987Model.find((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }	
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});

router.put('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    
    var niccode1987 = {
        description : req.body.description,
        section : req.body.section,
    };   

    nicCode1987Model.findOneAndUpdate(req.params.id,
        {$set:niccode1987},
        {new:true}, 
        (err,doc)=>{
        if(!err) {res.send(doc);}
        else {console.log('Error in niccode update:'+JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;