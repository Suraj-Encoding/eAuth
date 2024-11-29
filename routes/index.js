// # Home Route #

// # Router
const router = require('express').Router();

// # Home Route -> / 
router.get('/', (req, res, next) => {
  res.render('home');
});

// # Export Router
module.exports = router;