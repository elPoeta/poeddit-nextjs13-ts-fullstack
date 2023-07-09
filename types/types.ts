import { z } from "zod";

const envVariables = z.object({
  DATABASE_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),

  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),

  UPLOADTHING_SECRET: z.string(),
  UPLOADTHING_APP_ID: z.string(),

  REDIS_URL: z.string(),
  REDIS_SECRET: z.string(),
});

envVariables.parse(process.env);
declare global {
  namespace NodeJS {
    export interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
