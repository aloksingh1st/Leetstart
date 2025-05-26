import React, { useState } from 'react';
import codingImg from '../assets/coding.png';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Eye, EyeOff, Loader2, Mail, User } from 'lucide-react';
import { motion } from "framer-motion";


const SignUpSchema = z
    .object({
        email: z.string().email("Enter a valid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
        name: z.string().min(3, "Name must be at least 3 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

const Register = () => {


    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const { signup, isSigninUp } = useAuthStore();
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const onSubmit = async (data) => {

        try {
            await signup(data);
            console.log("SignUp Data:", data);
            navigate('/login');
        } catch (error) {
            console.error("SignUp failed:", error);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(SignUpSchema),
    });

    return (
        <div
            className="bg-no-repeat bg-center relative"
            style={{
                backgroundImage: `url(${codingImg})`,
                backgroundPosition: '90% center',
            }}
        >

            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#0a0a0a] via-[#0f172a] to-[#1e3a8a] opacity-80"></div>

            <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center bg-gradient-to-tr from-[#0a0a0a] via-[#0f172a] to-[#1e3a8a] text-white dark:bg-gradient-to-tr dark:from-[#f0f4f8] dark:via-[#d1d7e5] dark:to-[#3B82F6]">
                {/* Left Section – Sign Up Card */}
                <div className="flex justify-center sm:w-1/2 p-6 z-10">
                    <div
                        className={`p-10 bg-base-200 rounded-2xl shadow-2xl w-full max-w-md transition-transform duration-700 ${isFlipped ? 'translate-x-full' : ''}`}
                    >
                        <div className="mb-6">
                            <h3 className="text-3xl font-bold text-base-content">Sign Up</h3>
                            <p className="text-sm text-base-content/70">Create your account to get started.</p>
                        </div>

                        <div className="space-y-4">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Name */}
                                <div className="space-y-1">
                                    <div className="relative">
                                        <label className="text-sm font-medium text-base-content">Name</label>
                                        <input
                                            type="text"
                                            {...register("name")}
                                            className={`input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:border-blue-500 ${errors.name ? 'input-error' : ''}`}
                                            placeholder="Your Name"
                                        />
                                        <User className="absolute right-3 top-1/2 transform  w-5 h-5 text-gray-500" />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-1">
                                    <label htmlFor="email" className="text-sm font-medium text-base-content">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="email"
                                            type="email"
                                            {...register("email")}
                                            className={`input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:border-blue-500 pr-10 ${errors.email ? "input-error" : ""
                                                }`}
                                            placeholder="youremail@email.com"
                                        />
                                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="space-y-1">
                                    <label htmlFor="password" className="text-sm font-medium text-base-content">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            {...register("password")}
                                            type={showPassword ? "text" : "password"}
                                            className={`input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:border-blue-500 pr-10 ${errors?.password ? "input-error" : ""
                                                }`}
                                            placeholder="Create a password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute right-3 top-1/2 text-gray-500 flex items-center justify-center"
                                            style={{ transform: 'translateY(-50%)' }}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors?.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-1">
                                    <label htmlFor="confirm-password" className="text-sm font-medium text-base-content">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="confirm-password"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            {...register('confirmPassword')}
                                            className={`input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:border-blue-500 pr-10 ${errors['confirm-password'] ? 'input-error' : ''
                                                }`}
                                            placeholder="Re-enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 flex items-center justify-center"
                                            tabIndex={-1}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors['confirmPassword'] && (
                                        <p className="text-red-500 text-sm mt-1">{errors['confirmPassword'].message}</p>
                                    )}
                                </div>

                                {/* Register Button */}
                                <button
                                    type="submit"
                                    className="btn w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition duration-200"
                                    disabled={isSigninUp}
                                >
                                    {isSigninUp ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Loading...
                                        </>
                                    ) : (
                                        'Sign Up'
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="pt-6 text-center text-sm text-base-content/50">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-400 hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Section – Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hidden lg:flex flex-col justify-center items-start p-10 sm:w-1/2 max-w-xl z-10"
                >
                    {/* <motion.img
                        src="/logo.svg"
                        alt="Logo"
                        className="mb-5 w-16"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    /> */}

                    <motion.h1
                        className="text-4xl font-bold mb-4 leading-tight text-amber-50 dark:text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                    >
                        Join <span className='text-accent'> LeetStart </span> – Level Up Your Problem Solving
                    </motion.h1>

                    <motion.p
                        className="text-[#D3D3D3] dark:text-white/80 text-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                    >
                        Create your free account to access curated coding problems, detailed solutions, and interactive editor support.
                        Track your progress. Sharpen your skills. Crack your next interview.
                    </motion.p>
                </motion.div>

            </div>

        </div>
    );
};

export default Register;
