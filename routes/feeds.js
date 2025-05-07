// Initializing the install express package to use it in the application.
const express = require('express');

// Importing the controller file to use it in the application to perform the logic/action for the specific routes.
const feedsController = require('../controller/feeds');

// Initializing the router which is provided by the node-express library to use it in the application.
const router = express.Router();

// GET -> /feeds/post
router.get('/posts', feedsController.getPosts);

// POST -> /feeds/post
router.post('/post', feedsController.createPosts);

// exporting the module to use it in the application as a centralized router.
module.exports = router;