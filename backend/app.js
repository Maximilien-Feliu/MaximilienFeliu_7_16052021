import express from 'express';                                         // node framework express
import { Sequelize } from 'sequelize';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';


/*****  load environment variables from the .env file into process.env  *****/
dotenv.config();

console.log(process.env.NODE_ENV);
console.log(process.env.NAME_SESSION);
console.log(process.env.HOST);  

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql' 
});

try {
    await db.authenticate();
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

/*****  middleware to handle POST requests (extract the JSON Object)  
 *****  set a limit of request body size to avoid large request bodies from attackers  *****/
 app.use(express.urlencoded({ extended: true, limit: "100kb" }));          // parse the url encoded data with the qs library
 app.use(express.json({ limit: "100kb" }));                                // transform the request body to json 


export default app;                                                       // export the application