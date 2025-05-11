// Initializing the install express package to use it in the application.
const express = require('express');

// URL -> mongoDB collection.
// const DB_URL = 'mongodb+srv://NodeMongo:node-mongo-integration@node-mongo-integration.025ge.mongodb.net/feeds?w=majority&appName=social-media-application';
const DB_URL = 'mongodb+srv://snadi043:socialmedia@cluster0.ajq0d3q.mongodb.net/feeds?w=majority&appName=social-media-application';
// // Importing the mongoDB package in the application.
// const mongodb = require('mongodb');

// Importing the mongoose package in the application to configure it with the mongodb package.
const mongoose = require('mongoose');

// Initializing the 'body-parser' package to use it in the application.
const bodyParser = require('body-parser');

// Importing the routes file to update it in the whole application.
const feedsRoutes = require('./routes/feeds');

// Initializing the app with express.
const app = express();

// Middleware to use the body-parser to parse the json format data in the application.
app.use(bodyParser.json());

// Middleware to configure the necessary application server based settings to avoid interuptions while building the application.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
});

// Always make use the routes middleware is build after the response headers are set.
// Middleware to register the routes with the '/feeds' filter/flag to create and access the routes.
app.use('/feeds', feedsRoutes);

// Configuring the mongDB in the backend node code with the database.
mongoose.connect(DB_URL).then(result => {
    // Configuring the application server to respond/listen on the host 8080.
    app.listen(8080);
}).catch(err => {
    console.log(err);
});
