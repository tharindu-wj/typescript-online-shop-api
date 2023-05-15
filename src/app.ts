import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import errorHandler from "./middleware/errorHandler";

const port = config.get<string>("port");

const app = express();

app.use(express.json());

app.use(deserializeUser);

// app.use(errorHandler);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost${port}`);

  await connect();

  routes(app);
});
