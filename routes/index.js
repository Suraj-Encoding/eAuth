// # Home Route #

// # Router
const router = require('express').Router();

// # Home Route -> / 
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;