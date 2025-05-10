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
    // The title and the content are retrieved from the form inputs in the application.
    const title = req.body.title;
    const content = req.body.content;
    res.status(201).json({
        message: 'A new post is created',
        post: {
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator: {
                name: 'SAI' // For now creator and createdAt will be hardcoded until the database is configured.
            },
            createdAt: new Date()
        }
    });
}