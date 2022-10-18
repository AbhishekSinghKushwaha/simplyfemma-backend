const express = require("express");
const router = express.Router();
const nicCode2008Model = require("../../models/nicCodes/nicCode2008");
var ObjectId = require('mongoose').Types.ObjectId;

router.post("/", async(req, res) => {

    await nicCode2008Model.insertMany(req.body, function (err, docs) {
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
    await nicCode2008Model.find((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }	
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});

router.put('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    
    var niccode2008 = {
        subClass : req.body.subClass,
        class : req.body.class,
        group : req.body.group,
        division : req.body.division,
        section : req.body.section
    };   

    nicCode2008Model.findOneAndUpdate(req.params.id,
        {$set:niccode2008},
        {new:true}, 
        (err,doc)=>{
        if(!err) {res.send(doc);}
        else {console.log('Error in niccode update:'+JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;