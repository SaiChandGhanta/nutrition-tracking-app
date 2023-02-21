import express from 'express';
import * as nutritionController from '../controllers/nutritionController.js'
import auth from '../middleware/auth.js'


const router = express.Router()

router.post('/', auth, nutritionController.createIntakeLog).get('/', auth, nutritionController.listIntake).delete('/', auth, nutritionController.deleteIntakeHistory)

export default router