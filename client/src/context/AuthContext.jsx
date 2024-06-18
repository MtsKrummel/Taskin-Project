import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { loginRequest, registerRequest, verifyTokenRequest } from "../API/auth";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isRegistered, setIsRegistered] = useState(false);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setIsRegistered(true);
        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            localStorage.setItem('token', res.data.token); // Almacenar el token en localStorage al iniciar sesión
        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data);
        }
    };

    useEffect(() => {
        const checkLogin = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest(token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return setUser(null);
                }

                setUser(res.data);
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        };

        checkLogin();
    }, []);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [errors]);

    const logout = () => {
        localStorage.removeItem('token'); // Eliminar el token al cerrar sesión
        setUser(null);
        setIsAuthenticated(false);
    };

    const isLoggedIn = () => {
        return !!user;
    };

    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                logout,
                user,
                isAuthenticated,
                isRegistered,
                errors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};