import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import apiClient from "../services/api";

export async function registerForPushNotificationsAsync() {
  try {
    // 1. SILENT GUARD: If Expo Go, stop immediately.
    // This prevents the SDK 55 crash you are seeing.
    if (Constants.appOwnership === "expo") {
      console.log("Environment: Expo Go. Skipping notification registration.");
      return null;
    }

    // 2. DEVICE GUARD: Notifications don't work on Emulators.
    if (!Device.isDevice) {
      console.log("Environment: Emulator. Skipping notification registration.");
      return null;
    }

    // 3. ANDROID CHANNEL SETUP
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#6366f1",
      });
    }

    // 4. PERMISSIONS
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") return null;

    // 5. GET TOKEN
    const tokenData = await Notifications.getDevicePushTokenAsync();
    const token = tokenData.data;

    // 6. SEND TO BACKEND
    if (token) {
      await apiClient.patch("/users/profile", { fcmToken: token });
      console.log("FCM Token synced to server.");
    }

    return token;
  } catch (error) {
    // 7. CATCH ALL: Never let this function crash the UI
    console.warn("Notification Registration Error: ", error);
    return null;
  }
}
