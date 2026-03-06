import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import apiClient from "../services/api";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  initAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  // Initialize auth state on app launch
  initAuth: async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      if (token) {
        const res = await apiClient.get("/users/me");
        set({ user: res.data.data, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      set({ user: null, isLoading: false });
    }
  },

  // Login
  login: async (email, password) => {
    const res = await apiClient.post("/users/login", { email, password });
    const { accessToken, refreshToken, ...userData } = res.data.data;
    // Save tokens securely
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
    set({ user: userData });
  },

  // Register Action
  register: async (name, email, password) => {
    const res = await apiClient.post("/users", { name, email, password });
    const { accessToken, refreshToken, ...userData } = res.data.data;
    // Save tokens securely
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);

    set({ user: userData });
  },

  // Logout Action
  logout: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    set({ user: null });
  },
}));
