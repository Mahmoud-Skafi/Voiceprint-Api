const router = require('express').Router(),
    admin = require('./admin-router');

//just for testing
router.get('/', (req, res) => {
    res.json({
        message: "Hello World From Express"
    })
});
//Router's

router.use('/admin', admin);

module.exports = router;