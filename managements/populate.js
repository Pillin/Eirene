const logger = require("pino")();
const dotenv = require("dotenv");
const databaseConfig = require("../config/database");
const { populateNews } = require("./models/news");

dotenv.config();
const run = async () => {
  databaseConfig(logger);
  await populateNews(logger);
  process.exit();
};

run();
