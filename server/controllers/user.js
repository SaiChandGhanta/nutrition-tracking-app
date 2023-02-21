import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import userModel from '../models/user.js';
import userProfileModel from '../models/profile.js';

export const signin = async (req, res) => {

    const { email, password } = req.body;

    try {

        console.log(email, password)

        const existingUser = await userModel.findOne({ email })

        if (!existingUser) return res.status(401).json({ error: "User doesn't exists" })

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) return res.status(401).json({ error: "Invalid credentials" })

        // User is Valid ..Lets create JWT token and send it to client
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'secret', { expiresIn: "1h" });
        const userProfile = await userProfileModel.findOne({user: existingUser._id})
        
        res.status(200).json({ result: existingUser, token, userProfileId: userProfile._id })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }

}

export const gsignup = async (req, res) => {

    // console.log("******** Final End Point ******")
    // console.log(req.body)

    const { email, name } = req.body;

    try {
        // const email_temp = email + "_google"
        const existingUser = await userModel.find({ email: email, password: "google" });

        console.log(existingUser)

        if (existingUser.length !== 0) {
            // user is already exist in the system
            return res.status(200).json({ result: existingUser })
        }

        // Store the user details in the DataBase
        const result = await userModel.create({ email: email, name: name, password: "google" })
        const userProfile = await userProfileModel.create({ user: result._id, email: email, firstName: name.split(' ')[0], lastName: name.split(' ')[1]})

        res.status(200).json({ result: result, userProfileId: userProfile._id })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }

}

export const signup = async (req, res) => {

    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {

            return res.status(400).json({ message: "User already exists!" })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password mismatch!" })
        }

        //  Creating the new user
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await userModel.create({ email, name: `${firstName} ${lastName}`, password: hashedPassword })
        const userProfile = await userProfileModel.create({user: result._id, email: email, firstName: firstName, lastName: lastName})

        const token = jwt.sign({ email: result.email, id: result._id }, 'secret', { expiresIn: "1h" });
        
        res.status(200).json({ result: result, userProfileId: userProfile._id, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }

}