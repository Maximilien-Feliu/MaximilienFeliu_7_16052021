const express = require( 'express');                                         // node framework express
const dotenv = require( 'dotenv');
const cors = require( 'cors');
const path = require( 'path');
const db = require( './config/database.js');

const userRoutes = require( './routes/user.js');

/*****  load environment variables  *****/
dotenv.config();

console.log(process.env.NODE_ENV);
console.log(process.env.NAME_SESSION);
console.log(process.env.HOST);  

try {
    db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const app = express();                                                      // create express application

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');                                                                          // Everyone can access to the API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');    // Allow to use some headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');                                    // Allow to use some methods
    next();
});

app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));       // respond to the request and serve the static folder 'images'

/*****  middleware to handle POST requests (extract the JSON Object)  
 *****  set a limit of request body size to avoid large request bodies = require( attackers  *****/
 app.use(express.urlencoded({ extended: true, limit: "100kb" }));          // parse the url encoded data with the qs library
 app.use(express.json({ limit: "100kb" }));                                // transform the request body to json 

 app.use('/api/auth', userRoutes);

module.exports = app;                                                       // export the application