import express from 'express';

import {register, login, allUsers, update, checkPsw, user} from '../controllers/user.js'

const router = express.Router();
//les urls qu'on peut acceder concernant les users.

router.get('/allusers', allUsers)
router.get('/:userId', user)
router.post('/register', register);
router.post('/login', login);
router.put("/:id", update);
router.post('/check', checkPsw)

export default router;