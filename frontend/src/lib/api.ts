import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
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

export default api;
