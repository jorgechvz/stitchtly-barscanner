import { z, ZodType } from "zod";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type RegisterType = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export type LoginType = {
  email: string;
  password: string;
};

// Zod Schema
export const LoginSchema: ZodType<LoginType> = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
