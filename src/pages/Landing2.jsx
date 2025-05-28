import React from 'react'

import LandingScene from '../components/LandingScene';
import ParticleBackground from '../components/ParticleBackground';
import Footer from "../components/Footer/Footer"
import { Link } from 'react-router-dom';

const Landing2 = () => {
    return (
        <>
            <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-x-hidden">
                <ParticleBackground />
                <div className="relative z-10">
                    <header className="fixed top-0 left-0 right-0 p-6 z-50">
                        <div className="max-w-7xl mx-auto flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="text-cyan-400 font-bold text-2xl">LeetStart</div>
                            </div>
                            <nav>
                                <ul className="flex gap-6">
                                    <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Problems</a></li>
                                    <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Learn</a></li>
                                    <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Compete</a></li>
                                    <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Jobs</a></li>
                                </ul>
                            </nav>
                            <div>
                                <Link to="/login" className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </header>

                    <main>
                        <LandingScene />

                        <Footer />
                    </main>

                </div>
            </div>
        </>
    )
}

export default Landing2