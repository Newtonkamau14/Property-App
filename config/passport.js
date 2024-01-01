const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../server/models/user.model").User;

//signup user
passport.use(
  "signup-user",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({
        where: {
          username: username,
        },
      })
        .then((existingUser) => {
          if (existingUser) {
            return done(null, false, { message: "Username already exists." });
          }

          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              return done(err);
            }

            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                return done(err);
              }

              const newUser = new User({
                username: username,
                password: hash,
                email: req.body.email,
                name: req.body.name,
                telephone: req.body.telephone,
                dateOfBirth: req.body.dateOfBirth,
              });

              newUser
                .save()
                .then(() => {
                  done(null, newUser);
                })
                .catch((err) => {
                  done(err);
                });
            });
          });
        })
        .catch((err) => {
          done(err);
        });
    }
  )
);

// Login user
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }

      return done(null, user);
    }
  )
);


//signup admin
passport.use(
  "signup-admin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({
        where: {
          username: username,
        },
      })
        .then((existingAdmin) => {
          if (existingAdmin) {
            return done(null, false, { message: "Admin already exists" });
          }

          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              return done(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                return done(err);
              }

              const newAdmin = new User({
                username: username,
                email: req.body.email,
                password: hash,
                
              });

              newAdmin
                .save()
                .then(() => {
                  done(null, newAdmin);
                })
                .catch((err) => {
                  done(err);
                });
            });
          });
        })
        .catch((err) => {
          done(err);
        });
    }
  )
);


//serialize user
passport.serializeUser(function (user, done) {
  done(null, user.user_id);
});

//deserialize user
passport.deserializeUser(async function (user_id, done) {
  const user = await User.findByPk(user_id);

  if (!user) {
    done(null, false);
  }

  done(null, user);
});

module.exports = passport
