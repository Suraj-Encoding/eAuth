// # Admin Route - Admin Dashboard #

// # Import
const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const { roles } = require('../utils/constants');

// # Admin Dashboard Route 
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find();
    res.render('admin', { users });
  } catch (error) {
    next(error);
  }
});

// # User Profile Route 
router.get('/user/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', '⚠️ Invalid ID!');
      res.redirect('/admin/users');
      return;
    }
    const person = await User.findById(id);
    res.render('profile', { person });
  } catch (error) {
    next(error);
  }
});

// # Update Role Route 
router.post('/update-role', async (req, res, next) => {
  try {
    const { id, role } = req.body;

    // # Checking for id and roles in req.body
    if (!id || !role) {
      req.flash('error', '⚠️ Invalid Request!');
      return res.redirect('back');
    }

    // # Check for valid mongoose objectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', '⚠️ Invalid ID!');
      return res.redirect('back');
    }

    // # Check for Valid role
    const rolesArray = Object.values(roles);
    if (!rolesArray.includes(role)) {
      req.flash('error', '⚠️ Invalid Role!');
      return res.redirect('back');
    }

    // # Admin cannot remove himself/herself as an admin
    if (req.user.id === id) {
      req.flash(
        'error',
        '⚠️ Admins cannot remove themselves from Admin, ask another Admin.'
      );
      return res.redirect('back');
    }

    // # Finally update the user
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    req.flash('info', `✔️ Updated role for ${user.email} to ${user.role}`);
    res.redirect('back');
  } catch (error) {
    next(error);
  }
});

// # Export
module.exports = router;