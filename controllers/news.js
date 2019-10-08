const { OK, NO_CONTENT } = require("http-status-codes");

const NewSchema = require("../models/new");

const getList = async (req, res) => {
  const { page } = req.params;
  const news = await NewSchema.find({})
    .skip(page)
    .limit(10);

  res
    .status(OK)
    .json({ status: "success", news })
    .end();
};

const remove = async (req, res) => {
  const { id } = req.params;
  const isActive = false;
  await NewSchema.findOneAndUpdate({ id }, { isActive }).orFail(() => Error("Not found"));
  res.status(NO_CONTENT).end();
};

module.exports = {
  getList,
  remove
};
