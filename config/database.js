const mongoose = require("mongoose");

const DatabaseConnection = logger => {
  const { DATABASE_URL } = process.env;
  mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on("connected", () => {
    logger.info(`Mongoose default connection is open to ${DATABASE_URL}`);
  });

  mongoose.connection.on("error", err => {
    logger.info(`Mongoose default connection has occured ${err} error`);
  });

  mongoose.connection.on("disconnected", () => {
    logger.info(`Mongoose default connection is disconnected`);
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      logger.info(`Mongoose default connection is disconnected due to application termination`);
      process.exit(0);
    });
  });
};

module.exports = DatabaseConnection;
