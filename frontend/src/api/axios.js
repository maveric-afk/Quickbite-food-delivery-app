import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // comes from .env
  withCredentials: true, // if you’re using cookies/sessions
});

export default api;