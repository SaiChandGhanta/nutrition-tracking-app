import express from 'express';
import * as activityController from '../controllers/activityController.js'
import auth from '../middleware/auth.js'


const activityRouter = express.Router()

activityRouter.post('/', auth, activityController.createActivityLog).get('/', auth, activityController.listActivity).delete('/', auth, activityController.deleteActivity)

export default activityRouter
