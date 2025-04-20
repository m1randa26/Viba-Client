import axios from "axios";

const API_URL = "http://localhost:8080/api/groups/";

export const groupService = {
    getGroups: () => axios.get(API_URL, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }),
    createGroup: (data) =>
        axios.post(API_URL, data, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }),
    deleteGroup: (id) => axios.delete(API_URL + id, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } }),
}