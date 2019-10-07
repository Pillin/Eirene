const routes = require("express").Router();
const newRouters = require("./news");

routes.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

routes.use("/news", newRouters);

module.exports = routes;
