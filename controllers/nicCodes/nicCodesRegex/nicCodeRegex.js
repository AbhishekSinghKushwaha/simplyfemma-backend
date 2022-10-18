const express = require("express");
const router = express.Router();
const nicCodeModel = require("../../../models/nicCodes/nicCode");

router.get('/search/:key', async (req, res)=>{
    var regex = new RegExp(req.params.key, 'i');
    await nicCodeModel.find()
    .or([{'policy': { $regex: regex }}, {'sector': { $regex: regex }}, {'equity': { $regex: regex }}, {'entryRoute': { $regex: regex }}, {'otherConditions': { $regex: regex }}, {'nic': { $regex: regex }}])
    .exec((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }	
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});

module.exports = router;