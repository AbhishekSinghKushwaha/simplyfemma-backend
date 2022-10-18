const express = require("express");
const router = express.Router();
const nicCode2008Model = require("../../../models/nicCodes/nicCode2008");

router.get('/search/:key', async (req, res)=>{
    var regex = new RegExp(req.params.key, 'i');
    await nicCode2008Model.find()
    .or([{'subClass': { $regex: regex }}, {'class': { $regex: regex }}, {'group': { $regex: regex }}, {'division': { $regex: regex }}, {'section': { $regex: regex }}])
    .exec((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }	
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});

module.exports = router;