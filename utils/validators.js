// # Validators for user registration #

// # Import 
const { body } = require('express-validator');

// # Export Validators 
module.exports = {
  registerValidator: [
    body('email')
      .trim()
      .isEmail()
      .withMessage('⚠️ Email must be a valid email!')
      .normalizeEmail()
      .toLowerCase(),
    body('password')
      .trim()
      .isLength(2)
      .withMessage('⚠️ Password length short, min 2 char required!'),
    body('password2').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('⚠️ Passwords do not match!');
      }
      return true;
    }),
  ],
};
