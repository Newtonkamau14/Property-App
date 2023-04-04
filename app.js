'use strict'
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')
const PORT = process.env.PORT || 5000;
const app = express();
require('./config/database');
require('./config/passport.config');



//Middleware
app.set('view engine','ejs');
app.set('layout','layouts/layout');
app.use(expressLayouts)
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use('/property',express.static('uploads'));
app.use('/admin',express.static('uploads'));
app.use(methodOverride('_method'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    store:  MongoStore.create({ mongoUrl: process.env.MONGOCOMPASS_URI, collectionName: 'sessions'}),
    secret: process.env.SESSION_SECRET,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 365,
    }
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    //res.locals.error = req.flash("error");
    //res.locals.success = req.flash("success");
    next(); 
});



//Routes
app.use('',require('./server/routes/auth'));
app.use('',require('./server/routes/property'));
app.use('',require('./server/routes/admin'));


//Logout
app.delete('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/auth/admin/login');
    });
});


app.listen(PORT,async () => {
    console.log(`Listening on http://localhost:${PORT}`);
});



module.exports = app;