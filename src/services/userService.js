import axios from "axios";

const API_URL = "http://localhost:8080/api/user/";

export const userService = {
    getAll: () => axios.get(API_URL, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }),
    deleteUser: (id) => axios.delete(API_URL + id, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } }),
}