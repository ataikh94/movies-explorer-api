const rateLimit = require('express-rate-limit');

const DB_URL = 'mongodb://127.0.0.1/bitfilmsdb';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = { limiter, DB_URL };
