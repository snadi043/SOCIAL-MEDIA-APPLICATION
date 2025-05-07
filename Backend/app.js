// Initializing the install express package to use it in the application.
const express = require('express');

// Initializing the 'body-parser' package to use it in the application.
const bodyParser = require('body-parser');

// Importing the routes file to update it in the whole application.
const feedsRoutes = require('./routes/feeds');

// Initializing the app with express.
const app = express();

// Middleware to use the body-parser to parse the json format data in the application.
app.use(bodyParser.json());

// Middleware to register the routes with the '/feeds' filter/flag to create and access the routes.
app.use('/feeds', feedsRoutes);

// Middleware to configure the necessary application server based settings to avoid interuptions while building the application.
const allowCrossDomain = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,PATCH,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
};

// Using the CORS configurations in the application.
app.use(allowCrossDomain);

// Configuring the application server to respond/listen on the host 8080.
app.listen(8080);