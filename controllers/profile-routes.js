const router = require('express').Router();
const { User } = require('../models');

// Import the custom middleware
const withAuth = require('../utils/auth');

// Render the user profile page
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.userid);

    //console.log('userid:', req.session.userid);

    const user = userData.get({ plain: true });

    if (user.avatar_type === 'C') {

      user.avatarImgPath = `/assets/img/avatar/custom/${user.avatar}`;
    } else {
      if (user.gender === 'm') {
        user.avatarImgPath = `/assets/img/avatar/preset/m/${user.avatar}`;
      } else {
        user.avatarImgPath = `/assets/img/avatar/preset/f/${user.avatar}`;
      }

    }
    //console.log(user);
    res.render('profile', {
      user,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
