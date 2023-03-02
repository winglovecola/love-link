const router = require('express').Router();
const { Post, Comment } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');


// get post
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);


    const commentData = await Comment.findAll(
      {
        where: {
          post_id: req.params.id,
        },
      });


    const post = postData.get({ plain: true });
    //const comments = commentData.get({ plain: true });

    const comments = commentData.map((commentObj) =>
      commentObj.get({ plain: true })
    );

    res.render('post-detail', { post, comments, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
