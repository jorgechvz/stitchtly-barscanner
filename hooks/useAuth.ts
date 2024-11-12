import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/api/auth.api";
import { useAuth as useAuthContext } from "@/context/AuthContext";

export const useAuth = () => {
  const { login } = useAuthContext();
  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      login(data.accessToken);
    },
    onError: (error) => {
      console.log("Error logging in", error);
      return error.message;
    },
  });
  return { loginMutation };
};
