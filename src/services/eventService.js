import axios from "axios";

const API_URL = "http://localhost:8080/api/event-types/";

export const eventService = {
    getEventTypes: () => axios.get(API_URL, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } }),
    createTypeEvent: (data) => axios.post(API_URL, data, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } }),
}