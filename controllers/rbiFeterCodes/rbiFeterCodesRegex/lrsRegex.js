const express = require("express");
const router = express.Router();
const lrsModel = require("../../../models/rbiFeterCodes/lrs");

router.get('/search/:key', async (req, res)=>{
    var regex = new RegExp(req.params.key, 'i');
    await lrsModel.find()
    .or([{'purposeCode': { $regex: regex }}, {'description': { $regex: regex }}])
    .exec((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }	
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});

module.exports = router;