import { Stack } from "expo-router";
import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import "../global.css";

export default function RootLayout() {
  const { initAuth, isLoading, user } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, []);

  if (isLoading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        // Protected Routes
        <Stack.Screen name="(tabs)" />
      ) : (
        // Auth Routes
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}
