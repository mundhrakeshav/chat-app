import { Secret } from "jsonwebtoken";

export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: 'development' | 'production';
      ORIGIN_URL: string;
      JWT_SECRET: Secret
    }
  }
}

