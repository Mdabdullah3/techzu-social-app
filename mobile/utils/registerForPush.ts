import Constants from "expo-constants";
import * as Device from "expo-device";
import { Platform } from "react-native";
import apiClient from "../services/api";

export async function registerForPushNotificationsAsync() {
  try {
    // 🚨 Skip entirely in Expo Go
    if (Constants.appOwnership === "expo") {
      console.log("Expo Go detected — skipping push notifications.");
      return null;
    }

    // Import notifications dynamically
    const Notifications = await import("expo-notifications");
    if (!Device.isDevice) return null;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const res = await Notifications.requestPermissionsAsync();
      if (res.status !== "granted") return null;
    }

    const tokenData = await Notifications.getDevicePushTokenAsync();
    const token = tokenData.data;

    if (token) {
      await apiClient.patch("/users/profile", { fcmToken: token });
    }

    return token;
  } catch (e) {
    console.warn("Push notifications skipped:", e);
    return null;
  }
}
