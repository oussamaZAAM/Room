import express from 'express';

import {register, login, allUsers, update} from '../controllers/user.js'

const router = express.Router();

router.get('/allusers', allUsers)
router.post('/register', register);
router.post('/login', login);
router.put("/:id", update);

export default router;