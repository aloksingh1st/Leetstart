import React from 'react';
import codingImg from '../assets/coding.png';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


const SignUpSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string().min(3, "Name must be at least 3 characters"),
});

const Register = () => {


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
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#0a0a0a] via-[#0f172a] to-[#1e3a8a] opacity-80"></div>

            <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center bg-gradient-to-tr from-[#0a0a0a] via-[#0f172a] to-[#1e3a8a] text-white dark:bg-gradient-to-tr dark:from-[#f0f4f8] dark:via-[#d1d7e5] dark:to-[#3B82F6]">
                {/* Left Section – Sign Up Card */}
                <div className="flex justify-center sm:w-1/2 p-6 z-10">
                    <div className="p-10 bg-base-200 rounded-2xl shadow-2xl w-full max-w-md">
                        <div className="mb-6">
                            <h3 className="text-3xl font-bold text-base-content">Sign Up</h3>
                            <p className="text-sm text-base-content/70">Create your account to get started.</p>
                        </div>

                        <div className="space-y-4">
                            {/* Name */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-base-content">Name</label>
                                <input
                                    type="text"
                                    {...register("name")}
                                    className={`input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:border-blue-500${errors.name ? "input-error" : ""
                                        }`}
                                    placeholder="Your Name"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-base-content">Email</label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    className={`input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:border-blue-500 ${errors.email ? "input-error" : ""
                                        }`}
                                    placeholder="youremail@email.com"
                                />

                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-base-content">Password</label>
                                <input
                                    className="input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:border-blue-500"
                                    type="password"
                                    placeholder="Create a password"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-base-content">Confirm Password</label>
                                <input
                                    type="password"
                                    {...register("password")}
                                    className={`input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:border-blue-500 ${errors.password ? "input-error" : ""
                                        }`}
                                    placeholder="Re-enter your password"
                                />
                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                className="btn w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition duration-200"
                            >
                                Register
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="pt-6 text-center text-sm text-base-content/50">
                            Already have an account?{' '}
                            <a href="/login" className="text-blue-400 hover:underline">
                                Sign in
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Section – Info */}
                <div className="hidden lg:flex flex-col justify-center items-start p-10 sm:w-1/2 max-w-xl z-10">
                    <img src="/logo.svg" alt="Logo" className="mb-5 w-16" />
                    <h1 className="text-4xl font-bold mb-4 leading-tight text-amber-50 dark:text-white">Create your account</h1>

                    <p className="text-[#D3D3D3] dark:text-white/80 text-sm">
                        Join our community and start exploring features made just for you. Connect, learn, and grow in a space that supports your journey.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Register;
