const dotenv = require("dotenv");
const request = require("async-request");
const NewSchema = require("../../models/new");

dotenv.config();
const { URL } = process.env;

const getPageInfoAndHits = async (url, number) => {
  const { page, nbPages, body } = await request(`${url}&page=${number}`);
  const news = JSON.parse(body).hits;
  return { page, nbPages, news };
};

const buildNewData = (allNews, actualNew) => {
  // TODO: How to fix that
  // eslint-disable-next-line camelcase
  const { story_title, title, author, created_at, objectID } = actualNew;
  const doc = {
    updateOne: {
      filter: { objectID },
      update: {
        // TODO: How to fix that
        // eslint-disable-next-line camelcase
        storyTitle: story_title || "",
        title: title || "",
        author,
        createdAt: created_at,
        objectID
      },
      upsert: true
    }
  };
  allNews.push(doc);
  return allNews;
};

const populateNewPage = async number => {
  const { page, nbPages, news } = getPageInfoAndHits(URL, number);
  const documentNews = news.reduce(buildNewData, []);
  await NewSchema.bulkWrite(documentNews);
  return [page, nbPages];
};

const populateNews = async () => {
  let page = 0;
  let nbPages = -1;
  [page, nbPages] = await populateNewPage(page);
  while (page < nbPages) {
    // eslint-disable-next-line no-await-in-loop
    [page, nbPages] = await populateNewPage(page + 1);
    page += 1;
  }
};

module.exports = {
  populateNews
};
