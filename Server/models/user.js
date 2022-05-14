import mongoose from 'mongoose';
//Creation du tableau de User
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    firstName: String,
    lastName: String,
    desc: String,
    password: String,
    birthYear: Number,
    picture: String,
    cover: String,
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
});

const User = mongoose.model('User', userSchema);

export default User;