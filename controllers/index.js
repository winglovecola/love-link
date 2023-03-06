const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const profileRoutes = require('./profile-routes.js');
//const chatRoutes = require('./chat-routes.js');


router.use('/', homeRoutes);

router.use('/profile', profileRoutes);

////router.use('/chat', chatRoutes);

router.use('/api', apiRoutes);

module.exports = router;
