import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/api/auth.api";
import { LoginType } from "@/types/auth.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_INFO_KEY = "user_info";

const saveUserToLocalStorage = async (user: LoginType) => {
  await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
};

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      saveUserToLocalStorage(data);
    },
    onError: (error) => {
      console.log("Error logging in", error);
      return error.message;
    },
  });
  return { loginMutation };
};
