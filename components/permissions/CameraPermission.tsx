import { Button } from "@/~/components/ui/button";
import { Card, CardContent, CardHeader } from "@/~/components/ui/card";
import { View, Text, Image } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

interface CameraPermissionProps {
  permissionFn: () => void;
}

export default function CameraPermission({
  permissionFn,
}: CameraPermissionProps) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Card className="m-auto w-full max-w-sm border-none border-0">
        <CardHeader className="flex flex-col items-center gap-y-4">
          <Text
            className="text-3xl font-bold text-primary"
            style={{ fontFamily: "Poppins_600SemiBold" }}
          >
            Enable Camera
          </Text>
          <Text className="text-gray-500 text-sm text-center">
            Please provide us access to your camera, which is required to scan
            the Bar Code.
          </Text>
        </CardHeader>
        <CardContent>
          <Image
            source={require("@/assets/images/allow-camera.jpg")}
            className="w-[300px] h-[300px] m-auto"
          />
          <Button className="py-2 rounded-2xl mt-4 w-1/2 m-auto" onPress={permissionFn}>
            <Text
              style={{ fontFamily: "Poppins_600SemiBold" }}
              className="text-white text-xl ont-bold"
            >
              Allow
            </Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}
