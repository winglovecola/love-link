const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const profileRoutes = require('./profile-routes.js');
const postNowRoutes = require('./post-now-routes.js');
const postDetailRoutes = require('./post-detail-routes.js');

router.use('/', homeRoutes);

router.use('/profile', profileRoutes);

router.use('/postnow', postNowRoutes);
router.use('/post', postDetailRoutes);

router.use('/api', apiRoutes);

module.exports = router;
