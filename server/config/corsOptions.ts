import { CorsOptions } from "cors";
import allowedOrigins from "./allowedOrigins";

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (origin && allowedOrigins.includes(origin)) {
      // Origin is allowed and present, grant access
      callback(null, true);
    } else if (!origin) {
      // No origin specified, potentially a preflight request. Allow for flexibility.
      callback(null, true);
    } else {
      // Origin is not allowed, deny access
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

export default corsOptions;
