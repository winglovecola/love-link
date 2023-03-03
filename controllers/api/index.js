const router = require('express').Router();

const userRoutes = require('./user-routes');

const matchRoutes = require('./match-routes');

router.use('/users', userRoutes);

router.use('/match', matchRoutes);


module.exports = router;
