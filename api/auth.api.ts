import { LoginType } from "@/types/auth.types";
import axios from "axios";
// TODO: Change API URL
export const loginRequest = async (data: LoginType) => {
  const response = await axios.post("http://10.0.2.2:3001/login", data);
  return response.data;
};
