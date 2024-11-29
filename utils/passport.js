// # Passport Service #

// # Import
const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

// # Passport Authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        // # Email not found
        if (!user) {
          return done(null, false, {
            message: '⚠️ Username/Email not registered!',
          });
        }
        // # Email exist and now we need to verify the password
        const isMatch = await user.isValidPassword(password);
        return isMatch
          ? done(null, user)
          : done(null, false, { message: '⚠️ Incorrect Password!' });
      } catch (error) {
        done(error);
      }
    }
  )
);

// # Serialize User
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// # Deserialize User
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});