const fs = require('fs');
const path = require('path');

const CACHE_FILE = path.join(__dirname, '../cache.json');
const CACHE_TTL = 60 * 1000; // 1 minute

exports.getCachedData = (callback) => {
    fs.readFile(CACHE_FILE, (err, data) => {
        let cache = { timestamp: 0, data: null };
        
        if (!err) {
            try {
                cache = JSON.parse(data);
                if (Date.now() - cache.timestamp < CACHE_TTL) {
                    return callback(null, cache.data);
                }
            } catch (parseError) {
                // Invalid cache file
            }
        }
        
        // Generate new data
        const newData = {
            timestamp: Date.now(),
            data: `Cached response: ${new Date().toLocaleString()}`
        };
        
        fs.writeFile(CACHE_FILE, JSON.stringify(newData), () => {});
        callback(null, newData.data);
    });
};