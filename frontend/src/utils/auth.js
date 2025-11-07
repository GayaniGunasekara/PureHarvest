// src/utils/auth.js
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'fc_token';

export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function getUserFromToken() {
    const token = getToken();
    if (!token) return null;
    try {
        return jwtDecode(token); // returns { id, name, email, role, iat, exp }
    } catch (error) {
        console.warn('Token decode failed:', error);
        return null;
    }
}
