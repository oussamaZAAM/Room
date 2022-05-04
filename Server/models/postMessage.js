import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: String,
    desc: String,
    userId: String,
    photo: {
        type: String,
        default:'',
      },
    // selectedFile: String,
    likes: {
        type: Array,
        default: []
    },
    dislikes: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: new Date()
    }, 
    room: String,
    comments: Array,
    roomers: {
        type: Number,
        default: 0
    },
    // vote: Number,
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;