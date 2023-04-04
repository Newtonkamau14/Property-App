const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../server/models/user.model');



passport.use(new LocalStrategy({ usernameField: 'email'},
  function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
          if (err) { return done(err); } //When some error occurs

          if (!user) {  //When username is invalid
              return done(null, false, { message: 'Incorrect username.' });
          }

          if (!bcrypt.compareSync(password, user.password)) { //When password is invalid 
              return done(null, false, { message: 'Incorrect password.' });
          }

          return done(null, user); //When user is valid
      });
    }
));

//Persists user data inside session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//Fetches session details using session id
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
      done(err, user);
  });
});
