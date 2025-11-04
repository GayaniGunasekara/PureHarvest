import axios from 'axios';
import { getToken } from './utils/auth';

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
});

api.interceptors.request.use(cfg => {
    const token = getToken();
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
});

export default api;
