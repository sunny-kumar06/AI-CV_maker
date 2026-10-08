

import { login, register, logout } from "../services/auth.api";
import { useAuth as useAuthContext } from "../auth.context";

export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useAuthContext();

    // LOGIN
    const handleLogin = async (formData) => {
        try {
            setLoading(true);
            const data = await login(formData);
            setUser(data.user);
            return data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // REGISTER
    const handleRegister = async (formData) => {
        try {
            setLoading(true);
            const data = await register(formData);
            setUser(data.user);
            return data;
        } catch (error) {
            console.error("Register error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // LOGOUT
    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, handleLogin, handleRegister, handleLogout };
};