const router = require('express').Router();
// const reactionRoutes = require('./reactionRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// router.use('/reactions', reactionRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

router.use((req, res) => {
    return res.send('Wrong route!');
});

module.exports = router;