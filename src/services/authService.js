import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const authService = {
    register: async (userData) => {
        const response = await axios.post(`${API_URL}/user/registro/`, userData);
        return response.data;
    },
    login: async (userData) => {
        const response = await axios.post(`${API_URL}/auth/signin`, userData);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }
}