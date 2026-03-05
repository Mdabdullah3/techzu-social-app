import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://172.16.0.2:5000/api/v1"; // Update with your IP

const apiClient = axios.create({ baseURL: API_URL });

apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
