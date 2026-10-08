

import { login, register, logout } from "../services/auth.api";
import { useAuth as useAuthContext } from "../auth.context";

export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useAuthContext();

    // LOGIN
    const handleLogin = async (formData) => {
        try {
            setLoading(true);

            const data = await login(formData);   // ✅ FIXED

            console.log("LOGIN RESPONSE:", data);

            setUser(data.user);

            return data;
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // REGISTER
    const handleRegister = async (formData) => {
        try {
            setLoading(true);

            const data = await register(formData);  // ✅ FIXED

            setUser(data.user);

            return data;
        } catch (error) {
            console.error(error);
            return null;
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