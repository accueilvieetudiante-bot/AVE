import { z } from "zod";

export const profileSchema = z.object({
  full_name: z.string().trim().min(2, "Trop court").max(80),
  university: z.string().trim().max(120).optional().or(z.literal("")),
  field_of_study: z.string().trim().max(120).optional().or(z.literal("")),
  campus: z.string().trim().max(120).optional().or(z.literal("")),
});

export type ProfileInput = z.infer<typeof profileSchema>;
