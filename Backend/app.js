// Initializing the install express package to use it in the application.
const express = require('express');

// Importing the express provided path package to build the static paths in the application.
const path =  require('path');

// Importing multer package in the application.
const multer = require('multer');

// Configuring the FileStorage to handle the user file upload feature in the application.
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const fileName = new Date().toISOString() + '-' + file.originalname;
        cb(null, file.fieldname + '-' + fileName);
    }
});

// Configuring the fileFilter property to seed it to the multer method to control the format of the files in the application.
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
};

// URL -> mongoDB collection.
// const DB_URL = 'mongodb+srv://NodeMongo:node-mongo-integration@node-mongo-integration.025ge.mongodb.net/feeds?w=majority&appName=social-media-application';
const DB_URL = 'mongodb+srv://snadi043:socialmedia@cluster0.ajq0d3q.mongodb.net/feeds?w=majority&appName=social-media-application';

// Importing the mongoose package in the application to configure it with the mongodb package.
const mongoose = require('mongoose');

// Initializing the 'body-parser' package to use it in the application.
const bodyParser = require('body-parser');

// Importing the routes file to update it in the whole application.
const feedsRoutes = require('./routes/feeds');
const userRoutes = require('./routes/user');

// Initializing the app with express.
const app = express();

// Middleware to use the body-parser to parse the json format data in the application.
app.use(bodyParser.json());

// Middleware to construct a static path for the images in the application.
app.use('/images', express.static(path.join(__dirname, 'images')));

// Configuring the multer middleware with all the necessary properties enabled to accept the single file at a time in the applicaiton.
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

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
app.use('/auth', userRoutes);

// Configuring the middlware to catch the global errors and customize the errors in the application.
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    res.status(status).json({
        message: error.message,
        data: error.data
    });
});
// Configuring the mongDB in the backend node code with the database.
mongoose.connect(DB_URL).then(result => {
    // Configuring the application server to respond/listen on the host 8080.
    app.listen(8080);
}).catch(err => {
    console.log(err);
});
