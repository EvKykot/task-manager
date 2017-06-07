'use strict';

const router = require('express').Router();

router.use('/auth', require('../api/auth/auth.express'));
router.use('/profile', require('../api/profile/profile.express'));
router.use('/notes', require('../api/notes/notes.express'));

module.exports = router;
