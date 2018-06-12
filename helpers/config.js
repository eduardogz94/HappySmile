const express = require('express');
const app = express();

if (app.get('env') == 'development') {
    dbing = require('./my_db.js')
    const config = {
        dbUrl: dbing.url
    }
    module.exports = config;
} else {
    const config = {
        dbUrl: process.env.DATABASE_URL
    }
    module.exports = config;   
} 

