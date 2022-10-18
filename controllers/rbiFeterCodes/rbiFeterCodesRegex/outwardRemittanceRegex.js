const express = require("express");
const router = express.Router();
const outwardRemittanceModel = require("../../../models/rbiFeterCodes/outwardRemittance");

router.get('/search/:key', async (req, res)=>{
    var regex = new RegExp(req.params.key, 'i');
    await outwardRemittanceModel.find()
    .or([{'gr_no': { $regex: regex }}, {'purposeGroupName': { $regex: regex }}, {'purposeCode': { $regex: regex }}, {'description': { $regex: regex }}])
    .exec((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }	
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});

module.exports = router;