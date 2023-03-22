'use strict';
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session')
const methodOverride = require('method-override');
const PORT = process.env.PORT || 5000;
const app = express();



//Middleware
app.use(express.urlencoded({ extended: false}))
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(methodOverride('_method'));







//Routes
app.use('',require('./server/routes/auth'));
app.use('',require('./server/routes/dashboard'));
app.use('',require('./server/routes/property'));





app.listen(PORT,() => {
    console.log(`Listening on http://localhost:${PORT}`)
});



module.exports = app;