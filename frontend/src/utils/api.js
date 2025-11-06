// src/utils/api.js
import axios from 'axios';
import { getToken } from './auth';

/*
  NOTES:
  - During development we recommend using the "proxy" entry in frontend/package.json:
      "proxy": "http://localhost:4000"
    With that, set baseURL to '/api' (below). This avoids CORS while developing.

  - If you prefer to call the backend directly (no proxy), replace baseURL with
    the full backend URL, e.g. 'http://localhost:4000/api' or 'https://api.yourdomain.com/api'
    (use HTTPS in production).
*/

const api = axios.create({
    // Dev-friendly default:
    baseURL: '/api',          // <-- keep this if you added "proxy" to package.json
    // For direct calls (no proxy), change to:
    // baseURL: 'http://localhost:4000/api',
    // or for production:
    // baseURL: 'https://api.yourdomain.com/api',
});

// Attach JWT Authorization header automatically if token exists
api.interceptors.request.use(cfg => {
    const token = getToken();
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
});

export default api;
