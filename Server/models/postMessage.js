import mongoose from 'mongoose';
//Creation du tableau du Post
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
        default: new Date() //On prend le temps de la creation du post comme date par defaut.
    }, 
    room: String,
    comments: Array,
    roomers: {
        type: Number,
        default: 0
    },
    sharer: {
        type: String,
        default: ""
    },
    shareDesc: String,
    sharedPost: String, 
    shareDate: Date,
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;