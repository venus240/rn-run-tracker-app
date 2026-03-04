import { Stack } from "expo-router";
import {
  useFonts,
  Kanit_400Regular,
  Kanit_700Bold,
} from "@expo-google-fonts/kanit";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {stack} from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#888ad6",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Kanit_700Bold",
          fontSize: 18,
          color: "#fff",
        },
        headerTintColor: "#fff",
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="run" options={{ title: "Run Tracker" }} />
      <Stack.Screen name="add" options={{ title: "Add Run" }} />
      <Stack.Screen name="[id]" options={{ title: "Run Detail" }} />
    </Stack>
   )
        },
};
