// import { useContext } from 'react';
// import { AuthContext } from '../auth.context';
// import { login, register, logout } from '../services/auth.api';

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     const { user, loading, setUser, setLoading } = context;

//     const handleLogin = async ({ email, password }) => {
//         setLoading(true);
//         try {
//             const response = await login({ email, password });
//             setUser(response.user);
//         }
//         catch (error) {
//             console.error("Login failed:", error);
//             // Optionally, you can set an error state here to display an error message to the user
//         }
//         finally {
//             setLoading(false);
//         }
//     }

//     const handleRegister = async ({ username, email, password }) => {
//         setLoading(true);
//         try {
//             const response = await register({ username, email, password });
//             setUser(response.user);
//         }
//         catch (error) {
//             console.error("Register failed:", error);
//             // Optionally, you can set an error state here to display an error message to the user
//         }
//         finally {
//             setLoading(false);
//         }
//     }


// import { loginUser, registerUser, logout } from "../services/auth.api";
// import { useAuth as useAuthContext } from "../auth.context";

// export const useAuth = () => {
//     const { user, setUser, loading, setLoading } = useAuthContext();

//     // 🔥 LOGIN FIX
//     const handleLogin = async (formData) => {
//         try {
//             setLoading(true);

//             const data = await loginUser(formData);

//             console.log("LOGIN RESPONSE:", data); // debug

//             setUser(data.user); // ✅ MOST IMPORTANT

//             return data;
//         } catch (error) {
//             console.error(error);
//             return null;
//         } finally {
//             setLoading(false);
//         }
//     };

//     // REGISTER
//     const handleRegister = async (formData) => {
//         try {
//             setLoading(true);

//             const data = await registerUser(formData);

//             setUser(data.user);

//             return data;
//         } catch (error) {
//             console.error(error);
//             return null;
//         } finally {
//             setLoading(false);
//         }
//     };

//     // LOGOUT
//     const handleLogout = async () => {
//         try {
//             await logout();
//             setUser(null);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { user, loading, handleLogin, handleRegister, handleLogout };
// };


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