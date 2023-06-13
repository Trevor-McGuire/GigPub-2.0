const router = require('express').Router();

const userRoutes = require('./user-routes');

router.use('/users', userRoutes);
router.use('/reviews', require('./reviews'));

module.exports = router;
