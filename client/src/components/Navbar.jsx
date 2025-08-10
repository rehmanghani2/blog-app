import { Link, NavLink, useNavigate } from "react-router-dom";
import {LogIn, UserPlus, PenSquare} from 'lucide-react';

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {FaUser, FaBlog, FaCircle, FaHome, FaPlus, FaSignInAlt, FaSignOutAlt, FaUserCircle, FaUserPlus } from "react-icons/fa";

import { username } from "../pages/Login";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    const linkClass = ({ isActive }) =>
        `flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
            isActive 
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-200"
        } `;

    return (
        <nav className="bg-white shadow-md w-full top-0 left-0 fixed z-50 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* LEFT SIDE - LOGO */}
                    {/* LOGO */}
                    <Link to='/' className="flex items-center gap-2 text-2xl font-bold text-blue-600">
                        <FaBlog /> MyBlog
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold">{username && `Welcome ${username}` }</h2>
                    </div>

                   { /* Right side - Links */}
                <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                            <FaHome /> Home
                        </Link>

                        {user ? (
                        <>
                            <Link to="/dashboard" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                                <FaUser /> Dashboard
                            </Link>
                            <Link to="/create-post" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                                <FaPlus /> New Post
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 text-red-600 hover:text-red-800"
                                >
                                <FaSignOutAlt /> Logout
                            </button>
                        </>
                        ) : (
                        <>
                            <Link to="/login" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                                <FaSignInAlt /> Login
                            </Link>
                            <Link to="/register" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                                <FaUserPlus /> Register
                            </Link>
                        </>
                        )}
                    </div>


                    {/* Desktop menu */}
                    <div className="hidden  md:flex-space-x-4">
                        <NavLink to='/' className={linkClass}>
                            <FaHome /> Home
                        </NavLink>

                        {user && (
                            <>
                                <NavLink to='/dashboard' className={linkClass} >
                                    <FaCircle /> Dashboard
                                </NavLink>
                                <NavLink to="/create-post" className={linkClass} >
                                    <FaPlus /> New Post
                                </NavLink>
                            </>
                        )}

                        {!user ? (
                            <>
                                <NavLink to="/login" className={linkClass}>
                                    <FaSignInAlt /> Login
                                </NavLink>
                                <NavLink to='/register' className={linkClass}>
                                    <FaUserPlus /> Register
                                </NavLink>
                            </>
                        ) : (
                            <button onClick={handleLogout} 
                                className="flex items-center gap-1 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200">
                                    <FaSignOutAlt /> Logout
                            </button>
                        )}
                    </div>
                    {/* Mobile hamburger */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-700 hover:bg-gray-200">
                            ☰
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg px-4 py-3 space-y-2">
                    <NavLink to='/' className={linkClass} onClick={() => setIsOpen(false)}>
                        <FaHome /> Home
                    </NavLink>

                    {user && (
                        <>
                            <NavLink to="/dashboard" className={linkClass} onClick={() => setIsOpen(false)}>
                                <FaUserCircle /> Dashboard
                            </NavLink>
                            <NavLink to='/create-post' className={linkClass} onClick={() => setIsOpen(false)}>
                                <FaPlus /> NewPost
                            </NavLink>
                        </>
                    )}

                    {!user ? (
                        <>
                            <NavLink to='/login' className={linkClass} onClick={() => setIsOpen(false)}>
                                <FaSignInAlt /> Login
                            </NavLink>
                            <NavLink to="/register" className={linkClass} onClick={() => setIsOpen(false)}>
                                <FaUserPlus /> Register
                            </NavLink>
                        </>
                    ) : (
                        <button onClick={() => {handleLogout(); setIsOpen(false);}}
                            className="flex items-center gap-1 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200">
                                <FaSignOutAlt /> Logout
                            </button>
                    )}
                </div>

                
            )}
        </nav>
    );
}







{/* 
//   <nav className="bg-white shadow-md py-4 mb-6"> 
        //     <div>
        //          <h1>Welcome {user?.username || "Guest"}</h1>
        //          <button onClick={logout} className="bg-red-500 px-5 py-2 text-white rounded cursor-pointer">Logout</button>
        //     </div> 
        //     <div className="container mx-auto flex justify-center items-center px-4">
        //         <Link to="/" className="text-2xl font-bold text-blue-600">📝 MyBlog</Link>
        //         <div className="space-x-4">
        //             <Link to="/login" className="text-gray-700 hover:text-blue-500 flex items-center gap-1">
        //                <LogIn size={18}/> Login
        //             </Link >

        //             <Link to="/register" className="text-gray-700 hover:text-blue-500 flex items-center gap-1">
        //                 <UserPlus size={18}/> Register
        //             </Link>

        //             <Link to="/dashboard" className="text-gray-700 hover:text-blue-500 flex items-center gap-1">
        //                 <PenSquare size={18}/> Dashboard
        //             </Link>

        //         </div>
        //     </div>
        // </nav> */}