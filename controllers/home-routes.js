const router = require('express').Router();
const {User} = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// mainpage and get all posts
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();

    const users = userData.map((user) =>
      user.get({ plain: true })
    );

    res.render('profile', {
      users,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login', {signupStatus: req.session.signupStatus});
});

module.exports = router;
