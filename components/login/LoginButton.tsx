import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "@/context/AuthContext";
import { Text, Pressable } from "react-native";
import { useNavigation } from "expo-router";
import useBLE from "@/hooks/useBLE";

export default function StartButton() {
  const { isLoggedIn } = useAuth();
  const { connectedDevice } = useBLE();
  const navigation = useNavigation();

  const handlePress = () => {
    if (!isLoggedIn) {
      navigation.navigate("login" as never);
    } else if (isLoggedIn && !connectedDevice) {
      navigation.navigate("device" as never);
    } else if (isLoggedIn && connectedDevice) {
      navigation.navigate("barcode" as never);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      className="w-2/3 bg-primary rounded-xl py-3 flex flex-row items-center px-8"
    >
      <Text className="text-white text-lg font-bold">Let's Start</Text>
      <Ionicons
        className="ml-auto"
        name="arrow-forward"
        size={24}
        color="white"
      />
    </Pressable>
  );
}
