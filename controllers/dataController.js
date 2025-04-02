const { getCachedData } = require('../utils/cache');

exports.getData = (req, res) => {
    getCachedData((err, data) => {
        if (err) return res.status(500).json({ error: 'Cache error' });
        res.json({ data });
    });
};