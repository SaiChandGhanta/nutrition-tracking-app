import express from 'express';

import { signin, signup, gsignup } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/google-signup', gsignup)
// / users / google - signup

export default router;