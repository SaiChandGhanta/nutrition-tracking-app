import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user.js';
import nutritionRoutes from './routes/nutritionRoute.js'
import activityRouter from './routes/activityRoute.js'
import userProfileRouter from './routes/userProfileRoute.js';

const app = express()
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())


app.use('/users', userRoutes);
app.use('/intake', nutritionRoutes)
app.use('/activity', activityRouter)
app.use('/profile', userProfileRouter)

export default app;