import { z } from "zod";

export const searchFilterSchema = z.object({
  search: z.string().trim().optional(),
});

export const sortOrderSchema = z.enum([
  "asc",
  "desc",
]);