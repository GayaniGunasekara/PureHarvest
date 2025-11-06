// src/utils/auth.js
import { jwtDecode } from 'jwt-decode';

export function setToken(token) {
    localStorage.setItem('fc_token', token);
}

export function getToken() {
    return localStorage.getItem('fc_token');
}

export function removeToken() {
    localStorage.removeItem('fc_token');
}

export function getUserFromToken() {
    const t = getToken();
    if (!t) return null;
    try {
        return jwtDecode(t);
    } catch (err) {
        console.warn('Failed to decode token', err);
        return null;
    }
}
