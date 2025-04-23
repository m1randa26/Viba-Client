import axios from "axios";

const API_URL = "http://localhost:8080/api/audit/";

export const bitacoraService = {
    getRequests: () => axios.get(API_URL, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } }),
}