import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: String,
    desc: String,
    userId: String,
    photo: {
        type: String,
      },
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }, 
    room: String,
    comments: Array,
    roomers: {
        type: Number,
        default: 0
    },
    vote: Number,
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;