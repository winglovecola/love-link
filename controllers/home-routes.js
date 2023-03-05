const router = require('express').Router();
const {User} = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// mainpage and get all posts
/* router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();

    const users = userData.map((user) =>
      user.get({ plain: true })
    );

    res.render('swipe', {
      users,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}); */

//matches
router.get('/friendlist', async (req, res) => {
  try {
    res.render('friendlist', {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/matches', async (req, res) => {
  try {
    res.render('friendlist', {
      userid: req.session.userid,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



// Swiping page and get all possible matches
router.get('/', withAuth, async (req, res) => {
  try {

    res.render('matches', {
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
