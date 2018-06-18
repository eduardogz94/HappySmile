const express = require('express');
let user = require('./../helpers/user_db');
let router = express.Router();

router.post('/checkPerson', (req,res) => {
    user.getPersonById(req.body.id).then(data => {
        res.send({
        	status:200,
            user: data
        })
    }).catch(err => {
        res.send({
            response: "err",
            status:404
        })
    });
});

module.exports = router;