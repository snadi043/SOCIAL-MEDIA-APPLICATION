// Initializing the install express package to use it in the application.
const express = require('express');

// Importing the express provided path package to build the static paths in the application.
const path =  require('path');

// Importing multer package in the application.
const multer = require('multer');

// Importing the resolvers and the schema objects to configure with the middleware in order to complie the graphql mechanism in the application.
const graphqlSchema =  require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

// Importing the createHandler property from the "graphql-http" package to configure with the middleware in order to complie the graphql mechanism in the application.
const {createHandler} = require('graphql-http/lib/use/http');

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

// // Importing the routes file to update it in the whole application.
// const feedsRoutes = require('./routes/feeds');
// const userRoutes = require('./routes/user');

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
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Middleware to configure the graphql mechanism in the application.
// "/graphql" -> is the single endpoint which deals with HTTP protocol to function on the backend code which is defined in the schema and the resolver files in the fileSystem.
// createHandler() -> is the method where we configure the schema and the rootValue props.
app.use('/graphql', createHandler({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphqli: true,
    formatError(err){
        if(!err.originalError){
            return err;
        }
        const data = err.originalError.data;
        const message = err.message || 'An error occured';
        const code = err.originalError.code || 500;
        return {message: message, data: data, status: code};
    }
    }),
);

// // Always make use the routes middleware is build after the response headers are set.
// // Middleware to register the routes with the '/feeds' filter/flag to create and access the routes.
// app.use('/feeds', feedsRoutes);
// app.use('/auth', userRoutes);

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
    // web socket is the feature which is helpful in building the real-time updating mechanism in the applications.
    // Generally, the flow of the applications are like the client request for the data which is pulled from the server with the help of database.
    // On the other hand, let's assume a case where there is a requirement to the application to send the information from the server to the client.
    // For example, a messaging or notification system, the client may not be able to send request every single time to know the updates on the 
        // messages or notifications in the applications as it becomes too cumbersome and demands lot of work from the servers and creates performance issues.
    // To avoid these drawbacks we integrate the resource called web sockets into our applications. One of the best packages to implement this mechanism is "socket.io".
    // Web sockets are capable of doing the interactions in both ways i,e pull(client -> server) and importantly also push(server -> client).
    // This mechanism is configured using the HTTP server in the backend and also by another package which has to be installed in the client side to do the heavy lifting.

    // Configuring the application server to respond/listen on the host 8080.
    app.listen(8080);
    
    // // Importing the socket.js file which has the re-usable module and accessing the init() method to initialize the server.
    // const io = require('./socket').init(server);
    // // Here on the "io" the socket.io provides with action methods like on() to create the connection to the client-side of the application.
    // io.on('connection', (socket) => {
    //     console.log('Connected to the socket successfully.');
    // });
    }).catch(err => {
    console.log(err);
});
