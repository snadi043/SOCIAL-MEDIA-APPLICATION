// Initializing the install express package to use it in the application.
const express = require('express');

// Importing the controller file to use it in the application to perform the logic/action for the specific routes.
const feedsController = require('../controller/feeds');

// Initializing the express-validator package to configure and utilize it in the application.
const {body} = require('express-validator'); 

const isAuth = require('../middleware/is-auth');

// Initializing the router which is provided by the node-express library to use it in the application.
const router = express.Router();

// GET -> /feeds/post
router.get('/posts', feedsController.getPosts);

// GET -> /feeds/post/:postId
// This is the route to render a single post/feed in the application.
router.get('/post/:postId', isAuth, feedsController.getPost);

// POST -> /feeds/post
// Configuring the "POST" route to sanatize and maintain consistentency in the data which is to be accepted in the application with set of error validation filters.
router.post('/post', 
    isAuth,  
    [
        body('title').isString().isLength({min: 5}).trim().withMessage('Please enter a title with at least 5 charecters'),
        body('content').isString().isLength({min: 5}).trim().withMessage('Please eneter the content with at least 5 charecters'),
    ],
    feedsController.createPosts);

// PUT -> /feeds/post/:postId
// Configuring the "PUT" method which is accepted by the javascript  fetch API to update a document and also to sanatize and maintain consistentency in the data 
// which is to be accepted in the application with set of error validation filters.
router.put('/post/:postId',
    isAuth,
    [
        body('title').isString().isLength({min: 5}).trim().withMessage('Please enter a title with at least 5 charecters'),
        body('content').isString().isLength({min: 5}).trim().withMessage('Please eneter the content with at least 5 charecters'),
    ], 
    feedsController.editPost);

// DELETE -> /feeds/post/:postId
// Configuring the "DELETE" method which is accepted by the javascript  fetch API to update a document and also to sanatize and maintain consistentency in the data 
// which is to be accepted in the application with set of error validation filters.
router.delete('/post/:postId', isAuth, feedsController.deletePost);

// exporting the module to use it in the application as a centralized router.
module.exports = router;