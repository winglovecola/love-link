const router = require('express').Router();
const { User } = require('../models');

// Import the custom middleware
const withAuth = require('../utils/auth');

// Render the user profile page
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.userid);

    console.log('userid:', req.session.userid);

    const user = [userData].map((userInfo) => userInfo.get({ plain: true }));

    res.render('user-profile', {
      user,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
