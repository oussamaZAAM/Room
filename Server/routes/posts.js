import express from 'express';

import {getPost, createPost, allPosts, feedPosts, updatePost, deletePost} from '../controllers/posts.js'

const router = express.Router();
//les urls qu'on peut acceder concernant les posts.
router.get('/:id', getPost);
router.post('/', createPost);
router.get('/profile/:username', allPosts)
router.get("/timeline/:userId", feedPosts)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)
export default router; 