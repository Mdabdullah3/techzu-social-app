import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String, 
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [commentSchema]
}, { timestamps: true });

postSchema.index({ userName: 1 });

const Post = mongoose.model('Post', postSchema);
export default Post;