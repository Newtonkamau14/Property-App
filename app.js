'use strict'
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const methodOverride = require('method-override');
const { sequelize } = require('./config/database');
const PORT = process.env.PORT || 5000;
const app = express();


const myStore = new SequelizeStore({
    db: sequelize
});

//Middleware
app.use('view engine','ejs');
app.use(expressLayouts)
app.use(express.urlencoded({ extended: false}))
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(methodOverride('_method'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    store: myStore,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
    }
}));
myStore.sync();




//Routes
app.use('',require('./server/routes/auth'));
app.use('',require('./server/routes/dashboard'));
app.use('',require('./server/routes/property'));





app.listen(PORT,() => {
    console.log(`Listening on http://localhost:${PORT}`)
});



module.exports = app;