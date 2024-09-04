import { Express } from "express";

declare global {
  namespace Express {
    interface User {
      role: string;
      user_id: string
    }
    interface Request {
      user?: User;
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE: string;
      DBUSER: string;
      PASSWORD: string;
      SESSION_SECRET: string;
    }
  }
}
