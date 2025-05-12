// Importing the models into the controller file to connect to the database.
const Feeds = require('../models/feeds');

// Configuring the express-validator provided "validationResult" object to register the package to handle the validation tasks.
const { validationResult } = require('express-validator');

// Controller to respond to the GET -> /feeds/posts url in the applicaton.
exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                "_id": "1",
                "title": "My First social media feed",
                "imageUrl": "images/content.png",
                "content": "This is the content created using the REST principles - 1",
                "creator":  
                {
                    "name": "SAI"
                },
                "createdAt": new Date(),
            },
            {
                "_id": "2",
                "title": "My Second social media feed",
                "imageUrl": "images/content.png",
                "content": "This is the content created using the REST principles - 2",
                "creator":  
                {
                    "name": "SAI"
                },
                "createdAt": new Date(),
            }
    ]
    });
}

// Controller to respond to the POST -> /feeds/post url in the applicaton.
exports.createPosts = (req, res, next) => {
    // In-order to enable the validationResult method code block, always initiate it before the execution of the input fields parsing procedure.
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Invalid charecter length entered in Title or Content fields.');
        error.statusCode = 422 // Optional parameters can be set to the global error method.
        throw error; 
    }
    // The title and the content are retrieved from the form inputs in the application.
    const title = req.body.title;
    const content = req.body.content;
    // Configuring the custom Feeds model created using mongoose package here.
    const post = new Feeds({
        title: title,
        content: content,
        imageUrl: 'images/content.png',
        creator: {
            name: 'SAI'
        }
    });
    // save() -> is the mongoose provided method to be used on the model object which will return a promise.
        post.save().then(result => {
            res.status(201).json({
                message: 'A new post is created',
                post: result
            });
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500
            }
            next(err);
        });
}