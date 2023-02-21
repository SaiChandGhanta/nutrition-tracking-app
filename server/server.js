import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

// mongoose.connect('mongodb://localhost/users')

// Importing port and url from .env file
dotenv.config();

const port = process.env.PORT || 5000
const url = process.env.MONGODB_URI

// Connecting with Mongo DB
mongoose.connect(url).then(() => console.log("Connection to MongoDB is successful"))
    .then(() => app.listen(port, () => console.log(`Server running on Port: ${port}`))
    ).catch((err) => console.log("Error: " + err.message));
