// # Auth Routes #

// # Import
const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');
const { registerValidator } = require('../utils/validators');

// # Render Login Page
router.get(
  '/login',
  ensureLoggedOut({ redirectTo: '/' }),
  async (req, res, next) => {
    res.render('login');
  }
);

// # Handle Login Form Submission
router.post(
  '/login',
  ensureLoggedOut({ redirectTo: '/' }),
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  }),
  (req, res) => {
    req.flash('success', '✔️ You have logged in successfully!');
    res.redirect('/');
  }
);

// # Render Register Page
router.get(
  '/register',
  ensureLoggedOut({ redirectTo: '/' }),
  async (req, res, next) => {
    res.render('register');
  }
);

// # Handle Register Form Submission
router.post(
  '/register',
  ensureLoggedOut({ redirectTo: '/' }),
  registerValidator,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
          req.flash('error', error.msg);
        });
        res.render('register', {
          email: req.body.email,
          messages: req.flash()
        });
        return;
      }

      const { email } = req.body;
      const doesExist = await User.findOne({ email });
      if (doesExist) {
        req.flash('warning', '⚠️ User with this email already exists!');
        res.redirect('/auth/register');
        return;
      }
      const user = new User(req.body);
      await user.save();
      req.flash(
        'success',
        `✔️ ${user.email} has been registered successfully! Please login.`
      );
      res.redirect('/auth/login');
    } catch (error) {
      next(error);
    }
  }
);

// # Logout Route
router.get(
  '/logout',
  ensureLoggedIn({ redirectTo: '/' }),
  async (req, res, next) => {
    req.logout();
    req.flash('success', '✔️ You have been logged out successfully!');
    res.redirect('/');
  }
);

// # Export Router
module.exports = router;