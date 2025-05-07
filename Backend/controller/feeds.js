// Controller to respond to the GET -> /feeds/posts url in the applicaton.
exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            "title": "My First social media feed",
            "content": "This is the content created using the REST principles"
        }]
    });
}

// Controller to respond to the POST -> /feeds/post url in the applicaton.
exports.createPosts = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    res.status(201).json({
        message: 'A new post is created',
        method: 'POST',
        body: {
        posts: {
            title: title,
            content: content
        }
    }
    });
}