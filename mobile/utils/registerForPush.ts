import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import apiClient from "../services/api";

// Tell the app how to handle notifications when it is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#6366f1",
    });
  }

  // 1. Ask for permission
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return;
  }

  // 2. Get the specific FCM (Device) Token
  try {
    const tokenData = await Notifications.getDevicePushTokenAsync();
    token = tokenData.data;
    console.log("FCM Token:", token);

    // 3. Send it to your Backend
    await apiClient.patch("/users/profile", { fcmToken: token });
    console.log("Token saved to database!");
  } catch (error) {
    console.log("Error getting push token", error);
  }

  return token;
}
