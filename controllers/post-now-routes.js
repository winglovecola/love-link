const router = require('express').Router();
const { Post, Comment } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');



// get post
router.get('/', withAuth, async (req, res) => {
  try {
    res.render('post-now', {loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




// get post
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    const post = postData.get({ plain: true });

    //console.log (post);
    res.render('post-now', {post, loggedIn: req.session.loggedIn});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
