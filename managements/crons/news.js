const cron = require("node-cron");

const { populateNews } = require("../models/news");

const callNewsApi = () => {
  const task = cron.schedule("*/60 * * * *", async () => {
    await populateNews();
  });
  task.start();
};

const startTasks = () => {
  callNewsApi();
};

module.exports = {
  startTasks
};
