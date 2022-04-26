import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    birthYear: Number,
    picture: String,
    followers: Array,
    following: Array,
});

const User = mongoose.model('User', userSchema);

export default User;