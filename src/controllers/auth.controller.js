
import { db } from "../libs/db.js"
import { UserRole } from "../../generated/prisma/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js";


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

        const verificationToken = crypto.randomBytes(32).toString("hex");


        const newUser = await db.user.create({
            data: {
                name,
                email,
                verificationToken,
                role: UserRole.USER,
                password: encryptedPassword,
            }
        })

        const rootUrl = `${req.protocol}://${req.get('host')}/`
        const mailgenContent = emailVerificationMailgenContent(newUser.name, rootUrl + verificationToken);

        sendEmail({
            email: email,          // recipient's email
            subject: "Verify your email address",  // subject line
            mailgenContent                         // email body generated using Mailgen
        });

        res.status(201).json({
            success: true,
            message: "User created successfully, Please verify to continue",
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


export const verifyUser = async (req, res) => {

    const { token } = req.params;

    try {
        const user = await db.user.findFirst({
            where: {
                verificationToken: token
            }
        });

        if (!user) {
            res.status(401).json({
                error: "User Not Found 🤷"
            })
        }

        await db.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationToken: null,
                passwordResetToken: null,
                passwordResetExpires: null,
            },
        });


        const JwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })


        const cookieOptions = {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        }

        res.cookie('jwt', JwtToken, cookieOptions);

        res.status(200).json({ message: "User verified successfully ✅" });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            error: "User verification failed 😬"
        });
    }
};


export const resendVerificationMail = async (req, res) => {

    const { email } = req.body;
    try {

        const user = db.user.findUnique({
            where: {
                email: email
            }
        });


        if (!user) {
            res.status(401).json({ error: "No user found with this email" })
        }


        const rootUrl = `${req.protocol}://${req.get('host')}/`
        emailVerificationMailgenContent(user.newUser.name, rootUrl + verificationToken);



    } catch (error) {

    }

};


export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(401).json({
                error: "User not found"
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return res.status(401).json({
                error: 'Invalid Credentials 🤷'
            })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        const options = {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV = "development",
            maxAge: 1000 * 60 * 60 * 24 * 7 //7 days
        };


        res.cookie("jwt", token, options);

        res.status(200).json({
            success: true,
            message: "User Logged in successfully!!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image,
            }
        });

    } catch (error) {

        console.error("Error creating user: ", error);

        res.status(500).json({
            error: "Error Logging in user"
        });
    }
};



export const logout = async (req, res) => {

    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        })

        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({
            error: "Error logging out user"
        })
    }
};


export const checkMe = async (req, res) => {

}


export const forgotPassword = async (req, res) => {

}


