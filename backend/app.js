const express = require( 'express');                                         // node framework express
const dotenv = require( 'dotenv');
const cors = require( 'cors');
const path = require( 'path');
const { sequelize } = require('./models/index');

const helmet = require('helmet');
const toobusy = require('toobusy-js');
const rateLimiter = require('./middleware/rateLimiter');                // middleware to handle the number of requests by Ip
const hpp = require('hpp');                                             // protect against HTTP Parameter Pollution attacks

const userRoutes = require( './routes/user.js');
const postRoutes = require('./routes/post.js');
const commentRoutes = require('./routes/comment.js');
const postReactionRoutes = require('./routes/postReaction.js');
const commentReactionRoutes = require('./routes/commentReaction.js');

/*****  load environment variables  *****/
dotenv.config();

console.log(process.env.NODE_ENV);
console.log(process.env.NAME_SESSION);
console.log(process.env.HOST);  

const app = express();                                                      // create express application

app.use((req, res, next) => {
    if (toobusy()) {
      res.send(503, "I'm busy right now, sorry.");
    } else {
      next();
    }
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');                                                                          // Everyone can access to the API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');    // Allow to use some headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');                                    // Allow to use some methods
    next();
});

app.use(cors());
app.use(helmet());
app.use(rateLimiter);
app.use(hpp());

app.use('/images', express.static(path.join(__dirname, 'images')));       // respond to the request and serve the static folder 'images'

/*****  middleware to handle POST requests (extract the JSON Object)  
 *****  set a limit of request body size to avoid large request bodies = require( attackers  *****/
 app.use(express.urlencoded({ extended: true, limit: "100kb" }));          // parse the url encoded data with the qs library
 app.use(express.json({ limit: "100kb" }));                                // transform the request body to json 

sequelize.sync();

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes); 
app.use('/api/post', commentRoutes); 
app.use('/api/post', postReactionRoutes);
app.use('/api/post/:postId/comment', commentReactionRoutes);

module.exports = app;                                                       // export the application