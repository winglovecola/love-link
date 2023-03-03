const router = require('express').Router();

// Import the custom middleware
const withAuth = require('../utils/auth');



// get post
router.get('/', withAuth, async (req, res) => {
  try {
    res.render('chat', {loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
