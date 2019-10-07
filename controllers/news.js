const { OK, NO_CONTENT } = require("http-status-codes");

const NewSchema = require("../models/new");

const getList = async (req, res, next) => {
  const news = await NewSchema.find({}).exec();
  console.log(news);
  res
    .status(OK)
    .json({ status: "success", news })
    .end();
  next();
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const isActive = false;
  await NewSchema.findOneAndUpdate({ id }, { isActive }).orFail(() =>
    Error("Not found")
  );
  res.status(NO_CONTENT).end();
};

module.exports = {
  getList,
  remove
};
