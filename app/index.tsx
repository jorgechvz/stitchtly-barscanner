import StartButton from "@/components/login/LoginButton";
import { Image, Text, View } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold
} from "@expo-google-fonts/poppins";
export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View className="flex-1 items-center bg-background">
      <Image
        className="w-full h-[350px] mt-20"
        source={require("@/assets/images/image.png")}
      />
      <View className="mt-16">
        <Text
          className="text-7xl text-center mb-4 text-primary"
          style={{ fontFamily: "Poppins_600SemiBold" }}
        >
          Welcome
        </Text>
        <Text
          className="text-4xl text-center"
          style={{ fontFamily: "Poppins_400Regular" }}
        >
          Stitchtly Barscanner
        </Text>
        <Text className="text-center mt-4 text-lg text-gray-500">
          Connecting and simplifying our workflow
        </Text>
      </View>
      <View className="absolute bottom-32 w-full items-center">
        <StartButton />
      </View>
      <Text className="absolute bottom-8 text-sm text-gray-400">
        © 2024 Stitchtly Inc. All rights reserved.
      </Text>
    </View>
  );
}
