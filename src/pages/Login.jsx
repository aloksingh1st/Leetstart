import React, { useEffect, useState } from 'react';
import codingImg from '../assets/coding.png';

const Login = () => {

    // const [theme, setTheme] = useState("dark");

    // useEffect(() => {
    //     document.querySelector("html").setAttribute("data-theme", theme);
    // }, [theme]);


    return (
        <div
            className="bg-no-repeat  bg-center relative"
            style={{
                // backgroundImage: `url(${codingImg})`,
                backgroundPosition: '0% center',
            }}
        >
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
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-base-content tracking-wide dark:text-white">
                                    Email
                                </label>
                                <input
                                    className="input input-bordered w-full dark:bg-navy-800 dark:border-navy-600"
                                    type="email"
                                    placeholder="mail@gmail.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-base-content tracking-wide dark:text-white">
                                    Password
                                </label>
                                <input
                                    className="input input-bordered w-full dark:bg-navy-800 dark:border-navy-600"
                                    type="password"
                                    placeholder="Enter your password"
                                />
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
                        </div>


                        <div className="pt-6 text-center text-sm text-base-content/50">
                            Already have an account?{' '}
                            <a href="/signup" className="text-blue-400 hover:underline">
                                Sign up
                            </a>
                        </div>



                        <div className="pt-5 text-center text-base-content/50 text-xs dark:text-white/50">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
