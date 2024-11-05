import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import "../styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BLEProvider } from "@/context/BLEContext";
export default function RootLayout() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <PaperProvider>
        <BLEProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="barcode" options={{ headerShown: false }} />
            <Stack.Screen name="device" options={{ headerShown: false }} />
          </Stack>
        </BLEProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
