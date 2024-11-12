import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import "../styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BLEProvider } from "@/context/BLEContext";
import { PortalHost } from "@rn-primitives/portal";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import useBLE from "@/hooks/useBLE";

export default function RootLayout() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <PaperProvider>
        <AuthProvider>
          <BLEProvider>
            <RootStack />
            <PortalHost />
          </BLEProvider>
        </AuthProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}

function RootStack() {
  const { isLoggedIn } = useAuth();
  const { connectedDevice } = useBLE();

  // Define la ruta inicial según el estado del usuario y del dispositivo
  const initialRoute = !isLoggedIn
    ? "login"
    : isLoggedIn && !connectedDevice
    ? "device"
    : "barcode";

  return (
    <Stack initialRouteName={initialRoute}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="device" options={{ headerShown: false }} />
      <Stack.Screen name="barcode" options={{ headerShown: false }} />
    </Stack>
  );
}
