import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());


app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

// const CONNECTION_URL= 'mongodb://localhost:27017';
const CONNECTION_URL= 'mongodb+srv://oussama:56331410@cluster0.t2rwn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=> app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))).catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);