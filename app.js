const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongo = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/health');
var db = mongoose.connection;

let LocalStrategy = require('passport-local').Strategy;

let routes = require('./routes/index');
let users = require('./routes/users');
// let work = require('./routes/work');
let device = require('./routes/devicesocket');

// Init App
let app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    let namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Головна'
  });
});

app.use('/', routes);
app.use('/users', users);

app.use(function(req, res, next) {
  res.status(404);
  res.render('404', {
    title: '404',
    show: false
  });
});

// Set Port
app.set('port', (process.env.PORT || 8888));

app.listen(app.get('port'), function() {
  console.log('Main server started on port ' + app.get('port'));
});
