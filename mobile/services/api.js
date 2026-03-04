import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://172.16.0.2:5000/api/v1';

const apiClient = axios.create({
    baseURL: API_URL,
});

// Request Interceptor: Add Token to every request
apiClient.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor: Handle Token Refreshing automatically
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = await SecureStore.getItemAsync('refreshToken');
                const res = await axios.post(`${API_URL}/users/refresh`, { refreshToken });

                const newAccessToken = res.data.data.accessToken;
                await SecureStore.setItemAsync('accessToken', newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                // If refresh fails, log out the user
                await SecureStore.deleteItemAsync('accessToken');
                await SecureStore.deleteItemAsync('refreshToken');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;