import { useContext } from 'react';
import { AuthContext } from '../auth.context';
import { login, register, logout } from '../services/auth.api';

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, loading, setUser, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const response = await login({ email, password });
            setUser(response.user);
        }
        catch (error) {
            console.error("Login failed:", error);
            // Optionally, you can set an error state here to display an error message to the user
        }
        finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const response = await register({ username, email, password });
            setUser(response.user);
        }
        catch (error) {
            console.error("Register failed:", error);
            // Optionally, you can set an error state here to display an error message to the user
        }
        finally {
            setLoading(false);
        }
    }

    // const handleLogout = async () => {
    //    try {
    //     const data = await getMe()
    //     setUser(data.user);
    //    }catch (error){} finally {
    //     setLoading(false);
    //    }
    //    getAndsetUser()
    // }

    const handleLogout = async () => {
        try {
            await logout(); // backend API call (logout route)

            setUser(null); // user remove
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return { user, loading, handleLogin, handleRegister, handleLogout };

};
