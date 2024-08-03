import { z } from "zod";

export const signupFormSchema = z.object({
  username: z.string().describe('Username').min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().describe("Email").email({
    message: "Email is not valid.",
  }),
  password: z.string().describe("Password").min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const loginFormSchema = z.object({
  username: z.string(). describe('Username').min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string(). describe("Email").email({
    message: "Email is not valid.",
  }),
  password: z.string(). describe("Password").min(8, {
    message: "Password must be at least 8 characters.",
  }),
});