declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    NEXTAUTH_SECRET: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;

    UPLOADTHING_SECRET: string;
    UPLOADTHING_APP_ID: string;

    REDIS_URL: string;
    REDIS_SECRET: string;
  }
}
