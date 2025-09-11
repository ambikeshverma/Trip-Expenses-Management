import axios from 'axios';

const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';
const api = axios.create({ baseURL: BASE });

export default api;
