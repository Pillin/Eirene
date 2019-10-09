const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const pino = require("express-pino-logger")();
const logger = require("pino")();
const dotenv = require("dotenv");
const routes = require("./routes");
const databaseConfig = require("./config/database");
const { startTasks } = require("./managements/crons/news");

dotenv.config();
const { PORT, NODE_ENV } = process.env;
if (NODE_ENV !== "test") {
  app.use(pino);
} else {
  logger.info = data => data;
}

databaseConfig(logger);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/", routes);
app.listen(PORT, () => logger.info(`server started in ${PORT}`));
startTasks(logger);
module.exports = { app };
