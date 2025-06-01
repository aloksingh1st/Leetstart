
import { db } from "../libs/db.js"
import { UserRole } from "../../generated/prisma/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { validationResult } from 'express-validator';
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js";

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: mySecurePassword123
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *                 example: USER
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists or validation error
 *       500:
 *         description: Server error
 */
export const register = async (req, res) => {


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

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
            message: "User created successfully, Please verify email and login to continue",
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


/**
 * @swagger
 * /api/v1/auth/verify/{token}:
 *   get:
 *     summary: Verify a user's email using a token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: The verification token sent to the user's email
 *         schema:
 *           type: string
 *           example: "random-verification-token-here"
 *     responses:
 *       200:
 *         description: User verified successfully and logged in
 *       401:
 *         description: User not found or invalid token
 *       500:
 *         description: Internal server error
 */


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

        res.status(200).json({ message: "User verified and logged in successfully  ✅" });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            error: "User verification failed 😬"
        });
    }
};


export const dummyMail = async (req, res) => {

    const mailgen = emailVerificationMailgenContent("ALOK", "localhost:8000/verification-token");

    await sendEmail({
        email: 'recipient@example.com',
        subject: 'Welcome to Task Manager',
        mailgenContent: {
            body: {
                name: 'John Doe',
                intro: 'Welcome to Task Manager! We’re very excited to have you on board.',
                action: {
                    instructions: 'To get started with Task Manager, please click here:',
                    button: {
                        color: '#22BC66',
                        text: 'Confirm your account',
                        link: 'https://taskmanager.app/confirm?token=abc123',
                    },
                },
                outro: 'Need help? Just reply to this email.',
            },
        },
    });


    res.status(200).json({ message: "Email resend successfully! ✅" });
}

/**
 * @swagger
 * /api/v1/auth/resend-verification:
 *   post:
 *     summary: Resend the verification email to the user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *     responses:
 *       200:
 *         description: Verification email sent successfully
 *       401:
 *         description: No user found with the provided email
 *       500:
 *         description: Internal server error
 */

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

        const rootUrl = `${req.protocol}://${req.get('host')}/api/v1/v1/auth/`
        const mailgen = emailVerificationMailgenContent(user.newUser.name, rootUrl + verificationToken);

        sendEmail({
            email: email,
            subject: "Verify your email address",
            mailgenContent
        });



        res.status(200).json({ message: "Email resend successfully! ✅" });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "User verification failed 😬"
        });
    }

};


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "mySecurePassword123"
 *     responses:
 *       200:
 *         description: User logged in successfully and JWT token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User Logged in successfully!!"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     role:
 *                       type: string
 *                       example: "USER"
 *                     image:
 *                       type: string
 *                       example: "user-image.jpg"
 *       400:
 *         description: Bad request, validation errors or missing fields
 *       401:
 *         description: Unauthorized, invalid credentials or user not found
 *       500:
 *         description: Internal server error
 */
export const login = async (req, res) => {


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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



        console.log("jwt_" + process.env.JWT_SECRET);

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        console.log("token_" + token);

        // const options = {
        //     httpOnly: true,
        //     sameSite: "Lax",
        //     secure: false,
        //     maxAge: 1000 * 60 * 60 * 24 * 7 //7 days
        // };


        // res.cookie("jwt", token, {
        //     httpOnly: true,
        //     secure: true, // must be true for cross-site cookies in production
        //     sameSite: "None", // "None" allows cross-site cookies
        //     maxAge: 1000 * 60 * 60 * 24 * 7,
        //   });


        const options = {
            httpOnly: true,
            secure: true, // must be true for cross-site cookies in production
            sameSite: "None", // "None" allows cross-site cookies
            maxAge: 1000 * 60 * 60 * 24 * 7,
        }

          
        res.cookie("jwt", token, options);

        res.status(200).json({
            success: true,
            message: "User Logged in successfully!!",
            secure: process.env.NODE_ENV,
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



/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Log out the user by clearing the JWT cookie
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Internal server error
 */


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



/**
 * @swagger
 * /api/v1/auth/checkme:
 *   get:
 *     summary: Check if the user is authenticated
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User authenticated successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     role:
 *                       type: string
 *                       example: "USER"
 *                     image:
 *                       type: string
 *                       example: "user-image.jpg"
 *       500:
 *         description: Internal server error
 */


export const checkMe = async (req, res) => {

    try {
        res.status(200).json({
            success: true,
            message: "User authenticated successfully",
            user: req.user
        });
    } catch (error) {
        console.error("Error checking user:", error);
        res.status(500).json({
            error: "Error checking user"
        })
    }
}


export const forgotPassword = async (req, res) => {

}





export const updateUserProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, email } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;
  
      if (!name && !email && !image) {
        return res.status(400).json({ message: "No valid fields provided" });
      }
  
      // Optional email uniqueness check
      if (email) {
        const emailExists = await db.user.findFirst({
          where: { email, NOT: { id: userId } },
        });
        if (emailExists) {
          return res.status(400).json({ message: "Email already in use" });
        }
      }
  
      const updatedUser = await db.user.update({
        where: { id: userId },
        data: {
          ...(name && { name }),
          ...(email && { email }),
          ...(image && { image }),
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
        },
      });
  
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
      });
  
    } catch (err) {
      console.error("Update profile error:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  