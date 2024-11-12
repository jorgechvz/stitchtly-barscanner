import { LoginType } from "@/types/auth.types";
import axios from "axios";
// TODO: Change API URL
export const loginRequest = async (data: LoginType) => {
  const response = await axios.post("https://stitchtly-warehouse-backend.onrender.com/auth/login", data);
  return response.data;
};
