import React from 'react'
import ThemeController from './ThemeController'
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { authUser, logout } = useAuthStore();


    const callLogout = () => {
        logout();
    }

    return (
        <div className="navbar bg-base-100 shadow-sm dark:shadow-none dark:drop-shadow-[0_2px_4px_rgba(255,255,255,0.05)]">

            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-base-content">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-lg">
                        <li><Link to="/problems" className="text-base-content hover:text-blue-400">Problems</Link></li>
                        <li><Link to="/playlists" className="text-base-content hover:text-blue-400">Playlists</Link></li>
                        {/* <li><a className="text-base-content hover:text-blue-400">About</a></li> */}
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl text-base-content">LeetStart</a>
            </div>

            <div className="navbar-end">
                <ThemeController />
                <div className="dropdown dropdown-end lg:mx-[35px]">
                    <div tabIndex={0} role="button" className="avatar">
                        <div className="w-8 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                        </div>
                    </div>


                    {

                        authUser &&
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to="/profile" className="text-base-content hover:text-blue-400">Profile</Link></li>
                            <li><a onClick={callLogout} className='text-base-content hover:text-blue-400'>Logout</a></li>
                        </ul>
                    }
                </div>

            </div>
        </div>
    )
}

export default Navbar