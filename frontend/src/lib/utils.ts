import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";
export const API_URL = "http://localhost:8000"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const authFormSchema = (type: string) => z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character" }),

  firstName: type === 'sign-in' 
      ? z.string().optional()
      : z.string().min(1, { message: "First name is required" })
          .min(3, { message: "First name must be at least 3 characters" }),

  lastName: type === 'sign-in' 
      ? z.string().optional()
      : z.string().min(1, { message: "Last name is required" })
          .min(3, { message: "Last name must be at least 3 characters" }),

  preferedGender: type === 'sign-in' 
      ? z.string().optional()
      : z.string().min(1, { message: "Preferred gender is required" }),

  dateOfBirth: type === 'sign-in'
      ? z.coerce.date().optional()
      : z.coerce.date().refine((date) => {
          const today = new Date();
          const age = today.getFullYear() - date.getFullYear();
          const m = today.getMonth() - date.getMonth();
          return age > 16 || (age === 16 && m >= 0);
      }, { message: "You must be at least 16 years old" }),
});