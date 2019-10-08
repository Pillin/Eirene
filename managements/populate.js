const logger = require("pino")();
const dotenv = require("dotenv");
const databaseConfig = require("../config/database");
const { populateNews } = require("./models/news");

dotenv.config();
const run = () => {
  databaseConfig(logger);
  populateNews();
};

run();
