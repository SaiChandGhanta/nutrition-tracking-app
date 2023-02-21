import express from 'express';
import * as userProfileController from '../controllers/userProfileController.js'
import auth from '../middleware/auth.js'


const userProfileRouter = express.Router()

userProfileRouter.get('/:id', auth, userProfileController.getProfile).put('/:id', auth, userProfileController.updateProfile)

export default userProfileRouter