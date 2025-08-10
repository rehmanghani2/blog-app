import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import {jwtDecode } from 'jwt-decode';
import api from "../utils/axios.js";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Load user from token on app load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded); // contains user ID and email
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            } catch (error) {
                console.log("Invalid token", error);
                localStorage.removeItem('token');
            }
        }
    }, []);
    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
        const decoded = jwtDecode(token);
        setUser(decoded);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const logout = () => {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{user, login, logout, token}}>
            {children}
        </AuthContext.Provider>
    )
}