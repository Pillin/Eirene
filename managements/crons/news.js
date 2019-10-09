const cron = require("node-cron");

const { populateNews } = require("../models/news");

const callNewsApi = logger => {
  const task = cron.schedule("*/60 * * * *", async () => {
    await populateNews(logger);
  });
  task.start();
};

const startTasks = logger => {
  callNewsApi(logger);
};

module.exports = {
  startTasks
};
