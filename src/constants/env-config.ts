import { z } from 'zod';

export const zodNumber = (defaultValue: number) =>
  z.coerce
    .number()
    .optional()
    .transform((v) => v || defaultValue);

const envSchema = z.object({
  SERVICE_NAME: z.string().default(''),
  SERVER_PORT: zodNumber(5555),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: zodNumber(25432),
  DB_USER: z.string().default('newuser'),
  DB_PASS: z.string().default('admin'),
  DB_NAME: z.string().default('database_name'),
});

export const EnvConfig = envSchema.parse(process.env);
