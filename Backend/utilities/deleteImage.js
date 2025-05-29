// Importing the express provided path package to build the static paths in the application.
const path =  require('path');

// This is a helper function to clear the images in the application used while updating the post or deleting the post.
const deleteImage = (filePath) => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};

exports.deleteImage = deleteImage;