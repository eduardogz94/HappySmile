const express = require ('express');
let router = express.Router();

router.use('/',require('./session'));
router.use('/persons',require('./users'));

module.exports = router;


