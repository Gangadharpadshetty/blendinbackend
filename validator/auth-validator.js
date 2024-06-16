import z from 'zod'

 export  const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least of 8 characters" })
    .max(16, "Password can't be greater than 16 characters"),
});

// Creating an object schema
 export  const signupSchema = loginSchema.extend({
  firstname: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(6, { message: "Name must be at lest of 3 chars. " })
    .max(255, { message: "Name must not be more than 255 characters" }),
    firstname: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(6, { message: "Name must be at lest of 3 chars. " })
    .max(255, { message: "Name must not be more than 255 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .length(10, { message: "Phone must  10 characters"})
    .trim()
});



