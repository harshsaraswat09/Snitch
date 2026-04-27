import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";



async function sendTokenResponse(user, res, message) {
    const token = jwt.sign({
        id: user._id
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("token", token)

    res.status(200).json({
        message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    })
}


export const register = async(req, res) => {

    const { email, contact, password, fullname, isSeller  } = req.body

    try {
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { contact }
            ]
        })

        if(existingUser) {
            return res.status(400).json({
                message: "User with this email already exists"
            })
        }

        const user = await userModel.create({
            email,
            contact,
            password,
            fullname,
            role: isSeller ? "seller" : "buyer"
        })

        await sendTokenResponse(user, res, "User registered successfully")



    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    
    }
}

export const login = async(req, res) => {
    const { email, password } = req.body
 
    try {
        const user = await userModel.findOne({email})
 
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
 
        const isMatch = await user.comparePassword(password)
 
        if(!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }
 
        await sendTokenResponse(user, res, "User logged in successfully")
 
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
 
}

export const googleCallback = async(req, res) => {
    try {
        const { id, displayName, emails } = req.user
 
        const email = emails[0].value
 
        let user = await userModel.findOne({ email })
 
        if(!user) {
            user = await userModel.create({
                email,
                googleId: id,
                fullname: displayName,
            })
        }
 
        const token = jwt.sign({
            id: user._id,
        }, config.JWT_SECRET, {
            expiresIn: "7d"
        })
 
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
 
        res.redirect(process.env.CLIENT_ORIGIN || "http://localhost:5173/")
 
    } catch (error) {
        res.status(500).json({ message: "Google login failed" })
    }
}


export const getMe = async (req, res) => {
    const user = req.user

    res.status(200).json({
        message: "User fetched successfully",
        success: true,
        user:{
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    })
}