const router = require('express').Router();
const { Post } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');



// get post
router.get('/', withAuth, async (req, res) => {
  try {

    let msg = {};

    msg.id = '';
    msg.toUserid = '2';



    res.render('msg', {loggedIn: req.session.loggedIn, msg });
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
