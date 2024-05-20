import z, { object } from "zod";

const EnvSchema = object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
});

export const env = EnvSchema.parse(process.env);