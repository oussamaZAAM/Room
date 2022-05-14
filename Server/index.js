import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import dotenv from "dotenv"
import multer from "multer"
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
//__dirname sert a donne le path au root en dependant sur la machine locale dont on execute ce code.
const __dirname = path.dirname(__filename);
// dotenv.config();

const app = express();
app.use("/images", express.static(path.join(__dirname, "public/images")));//pour donner l'acces aux images apartir du backend.

app.use(bodyParser.json({limit: "30mb", extended: true}));//Pour rendre app capable d'analyser les "json bodies"
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));//Pour rendre app capable d'analyser les "urlencoded bodies"
app.use(cors());//Skip same-origin policy, il rend app capable d'appeler des API qui fait parti d'un domaine autre que celui-ci
// les 15 lignes prochaines sert a telecharger les fichiers(images)  dans ./public/images(backend)
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

const CONNECTION_URL= 'mongodb://localhost:27017';
// const CONNECTION_URL = process.env.MONGO_DB;
const PORT = process.env.PORT || 5000;
//Se connecter a la base de donner puis rendre le serveur de backend accessible.
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=> app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))).catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);