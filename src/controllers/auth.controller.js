
import { db } from "../libs/db.js"
import { UserRole } from "../../generated/prisma/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {


    const { name, email, password, role } = req.body;


    // validorhere



    try {
        const existingUser = await db.user.findUnique({
            where: {
                email
            }
        })


        if (existingUser) {
            return res.status(400).json({
                error: "User already exists"
            })
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                name,
                email,
                role: UserRole.USER,
                password: encryptedPassword,
            }
        })


        console.log(newUser);


        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })


        const cookieOptions = {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        }

        res.cookie('jwt', token, cookieOptions);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
                image: newUser.image
            }
        })

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            error: "Error creating user"
        })
    }
};



export const verifyEmail = async (req, res) => {

};


export const resendVerificationMail = async (req, res) => {

};


export const login = async (req, res) => {

};



export const logout = async (req, res) => {

};


export const checkMe = async (req, res) => {

}


export const forgotPassword = async (req, res) => {

}


