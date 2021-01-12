const router = require('express').Router();
const House = require('../models/house');
const Phrases = require('../models/phrases');


//ADD HOUSES
router.post('/', async (req, res, next) => {
    try {
        const value = req.body;
        const inserted = await House.insertMany(value);
        res.json(inserted);
    } catch (error) {
        next(error);
    }
});

//GET ALL HOUSES
router.get('/', async (req, res, next) => {
    try {
        const find = await House.find({});
        res.json(find)
    } catch (error) {
        next(error);
    }
});
router.get('/:id/d', async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await House.findOne({
            "_id": id
        });
        if (!item) return next();
        res.json(item.door);
    } catch (error) {
        next(error);
    }
});

//get phrases
router.get('/phrase/:num', async (req, res, next) => {
    try {
        let { num } = req.params;
        value = parseInt(num);
        let item = await Phrases.find({});
        item = item.map(r => {
            return r.random;
        });
        console.log(item);
        item = item.sort(() => Math.random() - 0.5);

        item = item.slice(0, num);
        if (!item) return (next);
        return res.json(item);
    } catch (error) {
        next(error);
    }
});
//post phrases
router.post('/phrase/:str', async (req, res, next) => {
    try {
        let { str } = req.params;
        let value = { "random": str };
        const inserted = await Phrases.insertMany(value);
        res.json(inserted);
    } catch (error) {
        next(error);
    }
});

//GET HOUSE BY ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await House.findOne({
            "_id": id
        })
        if (!item) return (next);
        return res.json(item);
    } catch (error) {
        next(error);
    }
});
//SET LIGHT
router.post('/:id/l/:set', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { set } = req.params;
        const item = await House.findOne({
            "_id": id
        })
        if (!item) return next();
        const update = await House.updateMany({ "light": set });
        res.json(update);
    } catch (error) {
        next(error);
    }
});


//SET DOOR
router.post('/:id/d/:set', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { set } = req.params;
        const item = await House.findOne({
            "_id": id
        })
        if (!item) return next();
        const update = await House.updateMany({ "door": set });
        res.json(update);
    } catch (error) {
        next(error);
    }
});
//SET TEMP
router.post('/:id/t/:set', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { set } = req.params;
        const item = await House.findOne({
            "_id": id
        })
        if (!item) return next();
        const update = await House.updateMany({ "temp": set });
        res.json(update);
    } catch (error) {
        next(error);
    }
});
//ADD VOICEPRINT
// router.post('/:id/v', async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         console.log(req.body);
//         let value = req.body.voiceprints;
//         value = JSON.parse(value);
//         console.log(value);
//         const item = await House.findOne({
//             "_id": id
//         })
//         if (!item) return next();
//         item.voiceprints.push(value);
//         const update = await House.updateOne({ "_id": id }, { "voiceprints": item.voiceprints });
//         res.json(update);
//     } catch (error) {
//         next(error);
//     }
// });
router.post('/:id/v/:username/:voiceprint', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username } = req.params;
        let { voiceprint } = req.params;
        console.log(req.body);
        console.log(id, username, voiceprint);

        voiceprint = JSON.parse(voiceprint);
        const value = { "username": username, "features": voiceprint }
        // value = JSON.parse(value);
        console.log(value);
        const item = await House.findOne({
            "_id": id
        })
        if (!item) return next();
        item.history.push(value);
        const update = await House.updateOne({ "_id": id }, { "voiceprints": item.voiceprints });
        res.json(update);
    } catch (error) {
        next(error);
    }
});


router.get('/:id/v', async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await House.findOne({
            "_id": id
        })
        if (!item) return next();
        const voice = await House.findOne({});
        // console.log(voice.voiceprints);
        res.json(voice.voiceprints);
    } catch (error) {
        next(error);
    }
});

//GET VOICEPRINT
router.get('/:id/his', async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await House.findOne({
            "_id": id
        })
        if (!item) return next();
        const log = await House.findOne({});
        // console.log(voice.voiceprints);
        res.json(log.history);
    } catch (error) {
        next(error);
    }
});





router.post('/:id/his/:date/:log', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { date } = req.params;
        let { log } = req.params;
        console.log(req.body);
        // console.log(id, username, voiceprint);

        // voiceprint = JSON.parse(voiceprint);
        const value = { "date": date, "log": log }
        // value = JSON.parse(value);
        console.log(value);
        const item = await House.findOne({
            "_id": id
        })
        if (!item) return next();
        item.history.push(value);
        const update = await House.updateOne({ "_id": id }, { "history": item.history });
        res.json(update);
    } catch (error) {
        next(error);
    }
});
//GET VOICEPRINT


module.exports = router;
