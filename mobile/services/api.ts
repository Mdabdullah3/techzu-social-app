import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "https://techzu-social-app.onrender.com/api/v1";

const apiClient = axios.create({ baseURL: API_URL });

apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
