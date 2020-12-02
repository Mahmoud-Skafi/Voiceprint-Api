const router = require('express').Router(),
    admin = require('./admin-router');
house = require('./house-router');

//just for testing
router.get('/', (req, res) => {
    res.json({
        message: "Hello World From Express"
    })
});
//Router's

// router.use('/admin', admin);
router.use('/house', house);
module.exports = router;