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
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  initAuth: async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      if (token) {
        const res = await apiClient.get("/users/me");
        set({ user: res.data.data, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (e) {
      set({ user: null, isLoading: false });
    }
  },
  logout: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    set({ user: null });
  },
}));
