import express from 'express';

import {register, login, allUsers, update, checkPsw} from '../controllers/user.js'

const router = express.Router();
//les urls qu'on peut acceder concernant les users.

router.get('/allusers', allUsers)
router.post('/register', register);
router.post('/login', login);
router.put("/:id", update);
router.post('/check', checkPsw)

export default router; 