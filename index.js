const express = require('express');
const session = require('express-session');
const memcached_store = require('connect-memjs')(session);
const morgan = require('morgan');
const memjs = require('memjs');
const passport = require('passport');
const config = require('./helpers/config');
const app = express();
const port = process.env.PORT || 3000;



app.use(express.static(__dirname + '/WebContent'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

var mc = memjs.Client.create(process.env.MEMCACHIER_SERVERS, {
  failover: true,  // default: false
  timeout: 1,      // default: 0.5 (seconds)
  keepAlive: true  // default: false
})

app.use(session({
  secret:'keyboardcat',
  resave: false,
  saveUninitialized: false,
  // store: new memcached_store({
  //   servers: [process.env.MEMCACHIER_SERVERS],
  //   prefix: '_session_'
  // })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.redirect('./index.html');
});

app.use('/',require('./controllers/'));

passport.use(require('./helpers/localStrategy'));
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.listen(port);
