'use strict'
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const logger = require("morgan");
const { sequelize } = require("./config/database");
const flash = require('connect-flash');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = express();
const adminRouter = require('./server/routes/admin');
const authRouter = require('./server/routes/auth')
const propertyRouter = require('./server/routes/property')
require('./config/database');
require('./config/passport');

//Session Table
const myStore = new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 1000 * 60 * 60 * 24 * 28 * 12,
  });
  
  myStore.sync(() => {
    console.log("Session table created");
  });


//Middleware
app.set('view engine','ejs');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(cors());
app.use(flash());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use('/property',express.static('uploads'));
app.use('/showproperty',express.static('uploads'));
app.use('/admin',express.static('uploads'));
app.use(methodOverride('_method'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    store:  myStore,
    secret: process.env.SESSION_SECRET,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 28 * 3,
    }
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next(); 
});



//Routes
app.use('',require('./server/routes/auth'));
app.use('',require('./server/routes/property'));
app.use('/admin',adminRouter);



app.listen(PORT,async () => {
    console.log(`Listening on http://localhost:${PORT}`);
});



module.exports = app;