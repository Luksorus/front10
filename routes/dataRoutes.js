const express = require('express');
const router = express.Router();
const { getData } = require('../controllers/dataController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/', requireAuth, getData);

module.exports = router;