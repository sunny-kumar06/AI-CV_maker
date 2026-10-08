import api from '../../../services/api';

export async function register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', { username, email, password });
        if (response.data && response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post('/api/auth/login', { email, password });
        if (response.data && response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

export async function logout() {
    try {
        const response = await api.post('/api/auth/logout');
        localStorage.removeItem("token");
        return response.data;
    } catch (error) {
        console.error("Error logging out user:", error);
        localStorage.removeItem("token");
        throw error;
    }
}

export async function getMe() {
    try {
        const response = await api.get('/api/auth/get-me');
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}