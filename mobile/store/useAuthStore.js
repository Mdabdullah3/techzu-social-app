import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import apiClient from '../services/api';

const useAuthStore = create((set) => ({
    user: null,
    isLoading: true,
    // 1. Initialize Auth (Check if token exists when app starts)
    initAuth: async () => {
        try {
            const token = await SecureStore.getItemAsync('accessToken');
            if (token) {
                const res = await apiClient.get('/users/me');
                set({ user: res.data.data, isLoading: false });
            } else {
                set({ isLoading: false });
            }
        } catch (error) {
            set({ isLoading: false });
        }
    },

    // 2. Login Action
    login: async (email, password) => {
        const res = await apiClient.post('/users/login', { email, password });
        const { accessToken, refreshToken, ...userData } = res.data.data;
        await SecureStore.setItemAsync('accessToken', accessToken);
        await SecureStore.setItemAsync('refreshToken', refreshToken);
        set({ user: userData });
    },

    // 3. Logout Action
    logout: async () => {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        set({ user: null });
    }
}));

export default useAuthStore;