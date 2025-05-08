import mongoose from 'mongoose';
const {Schema, ObjectId} = mongoose;

const feedsSchema = new Schema(
    {
        _id: ObjectId, // ObjectId('') -> Special Data-Type supported by the mongoose package to create a unique ID in the mongoDB.
        required: true
    },
    {
        title: String,
        required: true,
    },
    {
        creator: Object,
        required: true,
    },
    {
        content: String,
        required: true,
    },
    {
        imageUrl: String,
        required: true,
    },
    // {
    //     createdAt: new Date.now(),
    //     required: true,
    // },
);

module.exports = mongoose.model('feeds', feedsSchema);