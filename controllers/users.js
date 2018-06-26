const express = require('express');
let user = require('./../helpers/user_db');
let router = express.Router();

router.post('/checkPerson', (req, res) => {
    user.getPersonById(req.body.id).then(data => {
        res.send({
            status: 200,
            user: data
        })
    }).catch(err => {
        console.log(err)
        switch (err.received) {
            case 0:
                res.send({
                    status: 404,
                    case: 'id'
                })
                break;
            default:
                res.send({
                    status: 403,
                    case: 'request'
                })
                break;
        }
    });
});

module.exports = router;