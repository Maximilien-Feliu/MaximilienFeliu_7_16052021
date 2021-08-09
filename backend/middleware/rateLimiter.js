/*****  prevent requests spaming  *****/
const mysql = require('mysql2');
const { RateLimiterMySQL } = require('rate-limiter-flexible');                  // request limiter
const dotenv = require( 'dotenv');

dotenv.config();

const pool = mysql.createPool({
    connectionLimit : 100,
    host: process.env.HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});
  
const opts = {
    storeClient: pool,
    dbName: process.env.DB_NAME,
    tableName: 'global_requests_limit', // all limiters store data in one table
    points: 500, // Number of points
    duration: 1, // Per second(s)
};
  
  // if second parameter is not a function or not provided, it may throw unhandled error on creation db or table
const rateLimiter = new RateLimiterMySQL(opts);

const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter.consume(req.ip)                                                 // one point added for every requests, user ip added to the limiter key
    .then(() => {
        next();
    })
    .catch(_ => {
        res.status(429).json('Too Many Requests !');
    })
};

module.exports = rateLimiterMiddleware;