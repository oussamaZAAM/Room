import express from 'express';

import {register, login, allUsers} from '../controllers/user.js'

const router = express.Router();

router.get('/allusers', allUsers)
router.post('/register', register);
router.post('/login', login);

export default router;