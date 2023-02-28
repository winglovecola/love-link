const router = require('express').Router();
const { User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// mainpage and get all posts
router.get('/', async (req, res) => {
  try {
    const userData = await Post.findAll();

    const users = userData.map((post) =>
      post.get({ plain: true })
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




module.exports = router;
