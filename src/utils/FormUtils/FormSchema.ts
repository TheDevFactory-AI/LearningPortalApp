import * as z from "zod"
// Regex patterns for password validation
const passwordRegex = {
    number: /\d/,                     // at least one digit
    uppercase: /[A-Z]/,               // at least one uppercase letter
    lowercase: /[a-z]/,               // at least one lowercase letter
    // specialChar: /[^A-Za-z0-9]/,   // Uncomment this if you decide to require a special character
  };

export const SignupSchema = z.object({
    email: z.string()
    .email('Invalid email address'), // Validates the email
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(passwordRegex.number, 'Password must contain at least 1 number')
    .regex(passwordRegex.uppercase, 'Password must contain at least 1 uppercase letter')
    .regex(passwordRegex.lowercase, 'Password must contain at least 1 lowercase letter'),
    // .regex(passwordRegex.specialChar, 'Password must contain at least 1 special character'), // Uncomment if special character is required
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'], // Error message is attached to confirmPassword field
});

export const LoginSchema = z.object({
  email: z.string()
  .email('Invalid email address'), // Validates the email
  password: z.string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(passwordRegex.number, 'Password must contain at least 1 number')
  .regex(passwordRegex.uppercase, 'Password must contain at least 1 uppercase letter')
  .regex(passwordRegex.lowercase, 'Password must contain at least 1 lowercase letter'),
  // .regex(passwordRegex.specialChar, 'Password must contain at least 1 special character'), // Uncomment if special character is required
});

