import axios from "axios";

const API_URL = "http://localhost:8080/api/members/";

export const memberService = {
    createMember: (data) => axios.post(API_URL, data, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }),
    getMembers: (id) => axios.get(`${API_URL}group/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
}