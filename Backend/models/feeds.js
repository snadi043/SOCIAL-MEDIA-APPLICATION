// Importing mongoose package in the models file of the application.
const mongoose =  require('mongoose');

// Initializing the schema from the mongoose package to create the connection with the mongoDB.
const Schema = mongoose.Schema;

const feedsSchema = new Schema({
        title: {
            type: String,
            required: true,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        }
    },
    // timeStamps is the optional property provided by the mongoose schema object which can be enabled to gather the information about created and updated times of the data-fields in the database.
    {timeStamps: true} 
);

module.exports = mongoose.model('Feeds', feedsSchema);