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

// Swiping page and get all possible matches
router.get('/swipe', withAuth, async (req, res) => {
  try {
    // Determine sex of user
    const sex = req.session.sex;
    let userData; //userData is working as intended

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

    const users = userData.map((user)=>
      user.get({ plain: true })
    );

    console.log(users[0]);

    // Create a new string that has all of the user information. Pass this to a script tag in the client side.
    let userDataString = '<script id="user-info">[';
    users.forEach((user) => {
      let storage = `{id: '${user.id}',firstname: '${user.firstname}',lastname: '${user.lastname}',sex: '${user.sex}',bio: '${user.bio}',avatar: '${user.avatar}'},`;
      userDataString += storage;
    });
    userDataString += ']</script>';

    res.render('matches', {
      users,
      userDataString,
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
