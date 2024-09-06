import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import session from "express-session";
import methodOverride from "method-override";
import cors from "cors";
import logger from "morgan";
import { sequelize } from "./config/database";
import flash from "connect-flash";
import SequelizeStore from "connect-session-sequelize";
import swaggerUI from "swagger-ui-express";
import path from "path";
import YAML from "yamljs";
import corsOptions from "./config/corsOptions";
import router from "./routes/index";
const PORT = process.env.PORT || 5000;
const app = express();
const SequelizeStoreInstance = SequelizeStore(session.Store);

// load api.yaml file, which is in the root directory of our project, as a JavaScript object
const swaggerJsDocs = YAML.load(path.resolve(__dirname, "./api.yaml"));
// setup docs from our specification file and serve on the /docs route
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

//Session Table
const myStore = new SequelizeStoreInstance({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 1000 * 60 * 60 * 24 * 28 * 12,
});

myStore.sync();

//Middleware
app.use(cors(corsOptions));
app.use(router);
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    store: myStore,
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 28 * 3,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, async () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

export { app };
