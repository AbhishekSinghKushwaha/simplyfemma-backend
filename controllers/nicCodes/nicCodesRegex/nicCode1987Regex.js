const express = require("express");
const router = express.Router();
const nicCode1987Model = require("../../../models/nicCodes/nicCode1987");

router.get('/search/:key', async (req, res)=>{
    var regex = new RegExp(req.params.key, 'i');
    await nicCode1987Model.find()
    .or([{'description': { $regex: regex }}, {'section': { $regex: regex }}])
    .exec((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }	
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});

module.exports = router;