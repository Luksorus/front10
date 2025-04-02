const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/profileController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/', requireAuth, getProfile);

module.exports = router;