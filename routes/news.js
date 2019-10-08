const express = require("express");
const controller = require("../controllers/news");

const router = express.Router();

router.get("/", controller.getList);
router.delete("/:_id", controller.remove);

module.exports = router;
