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

export const helpFormSchema = z.object({
    email: z.string()
      .email("Please enter a valid email.")
      .max(50, { message: "Email must be at most 50 characters long." }),
  
    firstName: z.string()
      .min(1, { message: "First name is required." })
      .max(50, { message: "First name must be at most 50 characters long." }),
  
    lastName: z.string()
      .min(1, { message: "Last name is required." })
      .max(50, { message: "Last name must be at most 50 characters long." }),
  
    subject: z.string()
      .min(1, { message: "Subject is required." })
      .max(100, { message: "Subject must be at most 100 characters long." }),
  
    description: z.string()
      .min(1, { message: "Description is required." })
      .max(350, { message: "Description must be at most 350 characters long." }),
  });

  export const shoeFormSchema = z.object({
    manufacturer: z.number({
      required_error: "Manufacturer is required",
      invalid_type_error: "Manufacturer must be a number",
    }),
    category: z.number({
      required_error: "Category is required",
      invalid_type_error: "Category must be a number",
    }),
    collection: z.number({
      required_error: "Collection is required",
      invalid_type_error: "Collection must be a number",
    }),
    model: z.string()
      .min(1, { message: "Model is required" })
      .max(50, { message: "Model name cannot exceed 50 characters" }),
    price: z.any(),
    description: z.string()
      .min(1, { message: "Description is required" })
      .max(500, { message: "Description cannot exceed 500 characters" }),
    bestseller: z.boolean().optional(),
    gender: z.enum(["male", "female", "unisex"], {
      required_error: "Gender is required",
      invalid_type_error: "Gender must be male, female, or unisex",
    }),
    shoe_high: z.enum(["low", "mid", "high"], {
      required_error: "Shoe height is required",
      invalid_type_error: "Shoe height must be low, mid, or high",
    }),
    on_sale: z.boolean().optional(),
    sale_price: z.any(),
    shoe_sizes: z.array(z.number()).nonempty({
      message: "At least one shoe size is required",
    }),
  });