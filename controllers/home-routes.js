const router = require('express').Router();
const {User} = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// Swiping page and get all possible matches
router.get('/swipe', withAuth, async (req, res) => {
  try {
    // Determine sex of user
    const sex = req.session.sex;
    let userData;

    if (sex === 'm') {
      userData = await User.findAll({
        where: {
          sex: 'f'
        }
      });
    } else {
      userData = await User.findAll({
        where: {
          sex: 'm'
        }
      });
    }

    const users = userData.map( (user) => {
      user.get({ plain: true });
    });

    res.render('homepage', {
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
