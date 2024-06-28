import { z } from "zod";

// Form Schema by Zod
export const formTemplateSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  email: z.string().email({
    message: "Invalid email format",
  }),
  address: z
    .object({
      address: z.string(),
    })
    .array(),
  type: z.string({
    required_error: "Type is required",
  }),
  notification: z.string({
    required_error: "Notification type is required",
  }),
  birthDate: z.date({
    required_error: "A date of birth is required.",
  }),
  accept: z.boolean().default(false),
});
