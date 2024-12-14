const { Router } = require('express')
const router = Router();


router.use('/category', require('./category'));
router.use('/post', require('./post'));


module.exports = router;