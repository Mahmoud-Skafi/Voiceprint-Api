
const router = require('express').Router();
const house = require('../models/house');
const House = require('../models/house');

router.get('/control',async (req,res) =>{
    await House.findOne({}).then(doc =>{
        res.send(doc);
    })
});

router.post('/control',async (req,res) =>{
    
    try{
        await House.findOneAndUpdate({},req.body,{
            new: true
          });
        res.status(201).send();
    }catch{

    }
});
module.exports = router;
