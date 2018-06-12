const express = require ('express');
let router = express.Router();

router.use('/',require('./session'));

module.exports = router;


