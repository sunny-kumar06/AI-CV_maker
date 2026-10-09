

import { login, register, logout } from "../services/auth.api";
import { useAuth as useAuthContext } from "../auth.context";

export const useAuth = () => {
    const { user, setUser, loading } = useAuthContext();

    // LOGIN
    const handleLogin = async (formData) => {
        try {
            const data = await login(formData);
            setUser(data.user);
            return data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    // REGISTER
    const handleRegister = async (formData) => {
        try {
            const data = await register(formData);
            setUser(data.user);
            return data;
        } catch (error) {
            console.error("Register error:", error);
            throw error;
        }
    };

    // LOGOUT
    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
            setUser(null);
        }
    };

    return { user, loading, handleLogin, handleRegister, handleLogout };
};