import React, { useEffect, useState } from 'react';
import codingImg from '../assets/coding.png';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from 'react-router-dom';
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import logo from '../assets/logo_bg_trans.png';

const loginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoggingIn } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            await login(data); // your auth logic here
            console.log("Login Data:", data);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div
            className="bg-no-repeat  bg-center relative"
            style={{
                backgroundPosition: '0% center',
            }}
        >
            {/* Gradient Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#0a0a0a] via-[#0f172a] to-[#1e3a8a] opacity-80"></div>

            {/* Logo at Top Left Corner */}
            {/* <motion.img
                src={logo}
                alt="LeetStart Logo"
                className="absolute top-[-12px] left-2 w-34"
                variants={{
                    hidden: { opacity: 0, scale: 0.9, y: -20 },
                    visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                            duration: 0.5,
                            ease: "easeOut",
                            bounce: 0.4,
                        }
                    },
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, ease: "easeOut" }}
            /> */}

            <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                {/* Left Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10"
                >
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.2,
                                    delayChildren: 0.3,
                                },
                            },
                        }}
                        className="self-start hidden lg:flex flex-col text-white"
                    >
                        <motion.h1
                            className="font-bold text-5xl mb-4 leading-tight"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.6 }}
                        >
                            Welcome Back to <span className="text-accent">LeetStart</span>
                        </motion.h1>

                        <motion.p
                            className="text-base text-white/80 pr-4"
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.6 }}
                        >
                            Pick up right where you left off.
                            Solve problems, review solutions, and stay interview-ready.
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Right Section (Login Form Card) */}
                <div className="flex justify-center self-center z-10">
                    <div className="p-12 bg-base-100 dark:bg-navy-900 mx-auto rounded-2xl w-100 shadow-xl">
                        <div className="mb-4">
                            <h3 className="font-semibold text-2xl text-base-content dark:text-white">Log In</h3>
                            <p className="text-base-content/70 dark:text-white/70">Please log in to your account.</p>
                        </div>

                        <div className="space-y-5">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                                            className={`input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:border-blue-500 pr-10 ${errors.email ? "input-error" : ""}`}
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
                                            className={`input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:border-blue-500 pr-10 ${errors?.password ? "input-error" : ""}`}
                                            placeholder="Enter password"
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

                                <div className="flex items-center justify-between">
                                    <label className="label cursor-pointer space-x-2">
                                        <input type="checkbox" className="checkbox checkbox-sm" />
                                        <span className="label-text text-sm text-base-content dark:text-white">
                                            Remember me
                                        </span>
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="text-primary hover:underline">
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full rounded-full font-semibold"
                                    >
                                        Log in
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="pt-6 text-center text-sm text-base-content/50">
                            Already have an account?{' '}
                            <Link to="/signup" className="text-blue-400 hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
