import React, { useEffect, useState } from 'react';
import codingImg from '../assets/coding.png';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from 'react-router-dom';
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Eye, EyeOff } from "lucide-react";




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
                // backgroundImage: `url(${codingImg})`,
                backgroundPosition: '0% center',
            }}
        >

            {/* <Toaster
                position="top-center"
                reverseOrder={false}
            /> */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#0a0a0a] via-[#0f172a] to-[#1e3a8a] opacity-80"></div>

            <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                {/* Left Section */}
                <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
                    <div className="self-start hidden lg:flex flex-col text-white dark:text-white">
                        <img src="" alt="Logo" className="mb-3" />
                        <h1 className="mb-3 font-bold text-5xl">Hi 👋 Welcome Back Aji</h1>
                        <p className="pr-3">
                            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
                            industries for previewing layouts and visual mockups.
                        </p>
                    </div>
                </div>

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



                        {/* <div className="pt-5 text-center text-base-content/50 text-xs dark:text-white/50">
                            <span>
                                Copyright © 2021-2022{' '}
                                <a
                                    href="https://codepen.io/uidesignhub"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    AJI
                                </a>
                            </span>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
