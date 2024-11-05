import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { Text, View, Button, Pressable } from "react-native";

export default function StartButton() {
  return (
    <Link href={"/device"} asChild>
      <Pressable className="w-2/3 bg-primary rounded-xl py-3 flex flex-row items-center px-8">
        <Text className="text-white text-lg font-bold">Let's Start</Text>
        <Ionicons
          className="ml-auto"
          name="arrow-forward"
          size={24}
          color="white"
        />
      </Pressable>
    </Link>
  );
}
