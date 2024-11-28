// # User Route #

// # Router
const router = require('express').Router();

// # Profile Route -> /profile
router.get('/profile', async (req, res, next) => {
  const person = req.user;
  res.render('profile', { person });
});

module.exports = router;