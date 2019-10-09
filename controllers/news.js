const { OK, NO_CONTENT } = require("http-status-codes");

const NewSchema = require("../models/new");

const getList = async (req, res) => {
  const { page } = req.query;
  const numberPerPage = 10;

  const news = await NewSchema.find({ isActive: { $ne: false } })
    .sort({ createdAt: -1 })
    .skip(parseInt(page, 10) * numberPerPage)
    .limit(numberPerPage);

  res
    .status(OK)
    .json({ status: "success", news })
    .end();
};

const remove = async (req, res) => {
  const { _id } = req.params;
  const isActive = false;
  await NewSchema.findOneAndUpdate({ _id }, { isActive }, { new: false }).orFail(() => Error("Not found"));
  res.status(NO_CONTENT).end();
};

module.exports = {
  getList,
  remove
};
