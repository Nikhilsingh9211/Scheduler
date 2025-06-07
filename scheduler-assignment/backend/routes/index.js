const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const availabilityRoutes = require('./availability');
const bookingRoutes = require('./booking');

router.use('/users', userRoutes);
router.use('/availability', availabilityRoutes);
router.use('/booking', bookingRoutes);

module.exports = router;
