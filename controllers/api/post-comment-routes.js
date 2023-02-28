const router = require('express').Router();
const { Comment } = require('../../models');

// Create post comment
router.post('/', async (req, res) => {
  try {
    const postCommentData = await Comment.create({
      post_id: req.body.postid,
      detail: req.body.postCommentDetail,
      poster_id: req.session.userid,
      poster: req.session.username,
      created_time: Date.now(),
      updated_time: Date.now(),
    });

    res.status(200).json(postCommentData);
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});


module.exports = router;
