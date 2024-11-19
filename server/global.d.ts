import { Express } from "express";

declare global {
  namespace Express {
    interface User {
      user_id: string;
      email: string;
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
      REACT_APP_URL: string
    }
  }
}
