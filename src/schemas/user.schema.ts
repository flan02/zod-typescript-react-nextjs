import { z } from "zod";

const plans = ["free", "basic", "medium", "premium"] as const;
export type Plans = (typeof plans)[number];

// * Podemos reutilizar la propiedad no importa el valor de la variable
export const mappedPlans: { [key in Plans]: string } = {
  free: "Free",
  basic: "Basic",
  medium: "Medium",
  premium: "VIP"
}

// TODO Prestar atencion a la propiedad weight, gracias a zod no es necesario hacer un parseo de string a number ya que imposibilita escribir letras. Aunque el numero es tomado como string
export const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(255, { message: "Name must be at most 255 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 6 characters long" })
    .max(255, { message: "Password must be at most 32 characters long" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  date: z.string().refine(d => new Date(d).toString() !== "Invalid Date", { message: "Invalid date" }),
  weight: z.string().refine(w => !isNaN(parseFloat(w)), { message: "Weight must be a number" }),
  plan: z.enum(plans, {
    errorMap: () => ({ message: "Please select a plan" })
  })
}).refine(data => data.password === data.confirmPassword, { message: "Passwords must match", path: ["confirmPassword"] });
