const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const postCommentRoutes = require('./post-comment-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', postCommentRoutes);
module.exports = router;
