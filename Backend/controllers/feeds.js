// Importing the fileSystem package to construct the filepath.
const fs = require('fs');

// Importing the socket.js file to use it in order to push the data to the users after the post is created.
const io = require('../socket');

// Importing the path package to create the path.
const path = require('path');

// Importing the models into the controller file to connect to the database.
const Feeds = require('../models/feeds');
const User = require('../models/user');

// Configuring the express-validator provided "validationResult" object to register the package to handle the validation tasks.
const { validationResult } = require('express-validator');

// Controller to respond to the GET -> /feeds/posts url in the applicaton.
exports.getPosts = async (req, res, next) => {
    const pageCount = req.query.page || 1; // This is the value for rendering the list of posts per page
    const perPage = 2;
    try{
        const totalItems = await Feeds.find().countDocuments();
        const posts = await Feeds.find()
            .skip((pageCount - 1) * perPage)
            .limit(perPage);
            res.status(200).json({
                message: 'Successfully Fetched the posts',
                posts: posts,
                totalItems: totalItems
            });
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

// Controller to respond to the GET => /feeds/post/:postId url in the application.
exports.getPost = async (req, res, next) => {
    const postId = req.params.postId;
    const post = await Feeds.findById(postId);
    try{
        if(!post){
                const error = new Error('Unable to find the post');
                error.status = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Fetched a single post with '+ postId,
                post: post
            });
        }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

// Controller to respond to the POST -> /feeds/post url in the applicaton.
exports.createPosts = async (req, res, next) => {
    // In-order to enable the validationResult method code block, always initiate it before the execution of the input fields parsing procedure.
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Invalid charecter length entered in Title or Content fields.');
        error.statusCode = 422 // Optional parameters can be set to the global error method.
        throw error; 
    }
    // Checking for the condition if the file format/type is not present in the response from the body parameters to avoid errors.
    if(!req.file){
        const error = new Error('Unable to fetch the image');
        error.statusCode = 422;
        throw error;
    }
    // The title and the content are retrieved from the form inputs in the application.
    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.file.path;
    let creator;
    // Configuring the custom Feeds model created using mongoose package here.
    const post = new Feeds({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: req.userId,
    });
    // save() -> is the mongoose provided method to be used on the model object which will return a promise.
    try{
        await post.save();
        const user = User.findById(req.userId);
        user.posts.push(post);
        await user.save();
        // Configuring the module from socket.js file to create an object which defines the action and the data properties to send it to the client-side. 
        // emit() -> is the method provided by the socket.io to send the notifications or data all the users including the user who created it.
        // broadcast() -> is another method by socket.io which is similar to emit by it doesnot count the user who created it.
        io.getIO().emit('posts', {action: 'create', post: post});
        res.status(201).json({
            message: 'A new post is created',
            post: post,
            creator: {_id: creator._id, name: creator.name}
        });    
    }
    catch(err){
        if(!err.statusCode){
             err.statusCode = 500
        }
        next(err);       
    }    
}

// Controller to respond to the PUT -> /feeds/post/:postId url in the applicaton.
exports.editPost = (req, res, next) => {
    const postId = req.params.postId;
    // Defining the error handler to trigger the error when it is unable to process the URL.
    const errors = validationResult(req);
    if(!errors.isEmpty){
        const error = new Error('Unable to find the post to edit');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.image; // In the formData the key is set as image in order to fetch the value from the body of the request.
    if(req.file){
        imageUrl = req.file.path;
    }
    if(!imageUrl){
        const error = new Error('Unable to find the post to edit');
        error.statusCode = 422;
        throw error;
    }
    Feeds.findById(postId).then(post => {
        if(!post){
            const error = new Error('Unable to find the post with an ' + postId);
            error.statusCode = 404;
            throw error;
        }
        if(post.creator.toString() !== req.userId){
            const error = new Error('User access not allowed. Unable to edit the post');
            error.statusCode = 403;
            throw error;
        }
        if(imageUrl !== post.imageUrl){
            deleteImage(post.imageUrl);
        }
        post.title = title;
        post.imageUrl = imageUrl; // imageUrl is the key in the model for the Feeds.
        post.content = content;
        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Post edited successfully',
            post: result
        });
    })
    .catch(err => {
    // Setting the error code, for any other uncatched error set those type of errors to server related error with statusCode of 500.
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

// This is a helper function to clear the images in the application used while updating the post or deleting the post.
const deleteImage = (filePath) => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};

// Controller to respond to the GET -> /feeds/post url in the applicaton.
exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Feeds.findById(postId)
    .then(post => {
        if(!post){
            const error = new Error('Unable to find the post to delete');
            error.statusCode = 422;
            throw error;
        }
        if(post.creator.toString() !== req.userId){
            const error = new Error('User access not allowed. Unable to edit the post');
            error.statusCode = 403;
            throw error;
        }
            deleteImage(post.imageUrl);
            return Feeds.findByIdAndDelete(postId);
    })
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Post deleted suceessfully',
        });
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}