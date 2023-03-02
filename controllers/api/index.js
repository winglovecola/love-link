const router = require('express').Router();

const userRoutes = require('./user-routes');
// const msgRoutes = require('./msg-routes');
const postCommentRoutes = require('./post-comment-routes');

router.use('/users', userRoutes);
// router.use('/msg', msgRoutes);
router.use('/comments', postCommentRoutes);
module.exports = router;
