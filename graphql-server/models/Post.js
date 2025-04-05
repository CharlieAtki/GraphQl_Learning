import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    content: {
        type: String,
    },
    reviews: [{ type: String }]
},
    {
        timestamps: true,
        collection: 'posts',
    }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
