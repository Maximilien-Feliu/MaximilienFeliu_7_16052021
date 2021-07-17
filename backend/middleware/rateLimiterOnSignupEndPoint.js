const mysql = require('mysql2');
const { RateLimiterMySQL } = require('rate-limiter-flexible');                      // request limiter 
const bcrypt = require('bcrypt');                                                   // package to create hashes for passwords
const dotenv = require('dotenv');

dotenv.config();

const maxCreateAccount = 10;

const pool = mysql.createPool({
    connectionLimit : 100,
    host: process.env.HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});
  
const opts = {
    storeClient: pool,
    dbName: process.env.DB_NAME,
    tableName: 'rate_limiter_on_signup', // all limiters store data in one table
    points: maxCreateAccount, // Number of points
    duration: 60 * 60 * 24, // Per second(s)
    blockDuration: 60 * 60 * 24,
};
  
  // if second parameter is not a function or not provided, it may throw unhandled error on creation db or table
const rateLimiter = new RateLimiterMySQL(opts);

module.exports = (req, res, next) => {
    rateLimiter.consume(req.ip)                                                     // one point added for every requests, user ip added to the limiter key
    .then(() => {
        next();
    })
    .catch(() => {
        res.status(429).json({message: 'Too Many accounts created'});
    });
}