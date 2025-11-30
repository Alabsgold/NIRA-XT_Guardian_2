import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const fetchStats = async () => {
    const response = await api.get('/threats/stats');
    return response.data;
};

export const fetchDevices = async () => {
    const response = await api.get('/devices');
    return response.data;
};

export const fetchLiveDNS = async () => {
    const response = await api.get('/dns/live');
    return response.data;
};

export const chatWithAI = async (message: string, history: any[] = []) => {
    const response = await api.post('/ai/chat', { message, history });
    return response.data;
};

export const analyzeDomain = async (domain: string) => {
    const response = await api.post('/ai/analyze-domain', { domain });
    return response.data;
};

export const fetchAIInsights = async () => {
    const response = await api.get('/ai/insights');
    return response.data;
};

export default api;
