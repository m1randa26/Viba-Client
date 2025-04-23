import axios from "axios";

const API_URL = "http://localhost:8080/api/event-types/";
const API_URL_EVENTS = "http://localhost:8080/api/events/my";
const API_URL_CONFIRM = "http://localhost:8080/api/events";


export const eventService = {
    getEventTypes: () => axios.get(API_URL, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } }),
    getEvents: () => axios.get(API_URL_EVENTS, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } }),
    createTypeEvent: (data) => axios.post(API_URL, data, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } }),
    deleteGroup: (id) => axios.delete(API_URL + id, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } }),

    
    confirmAttendance: (id) => axios.post(`${API_URL_CONFIRM}/${id}/attendance`, {}, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } 
  })
}
