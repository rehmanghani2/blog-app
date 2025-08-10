import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`         // "http://localhost:5000/api" // Update if deploying
})

export default api;