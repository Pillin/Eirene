const dotenv = require("dotenv");
const request = require("async-request");
const NewSchema = require("../../models/new");

dotenv.config();
const { URL } = process.env;

const getPageInfoAndHits = async (url, number) => {
  const response = await request(`${url}&page=${number}`);
  const data = JSON.parse(response.body);
  const { hits, page, nbPages } = data;
  return { page, nbPages, news: hits };
};

const buildNewData = (allNews, actualNew) => {
  // TODO: How to fix that
  // eslint-disable-next-line camelcase
  const { story_title, title, author, created_at, story_url, url, objectID } = actualNew;
  const doc = {
    updateOne: {
      filter: { objectID },
      update: {
        // TODO: How to fix that
        // eslint-disable-next-line camelcase
        storyTitle: story_title || "",
        title: title || "",
        // eslint-disable-next-line camelcase
        storyUrl: story_url || url || "",
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
  const data = await getPageInfoAndHits(URL, number);
  const { page, nbPages, news } = data;
  const documentNews = news.reduce(buildNewData, []);
  await NewSchema.bulkWrite(documentNews);
  return [page, nbPages];
};

const populateNews = async logger => {
  let page = 0;
  let nbPages = -1;
  [page, nbPages] = await populateNewPage(page);
  logger.info(`Fill with ${page} page`);
  page += 1;

  while (page < nbPages) {
    // eslint-disable-next-line no-await-in-loop
    [page, nbPages] = await populateNewPage(page);
    logger.info(`Fill with ${page} page`);
    page += 1;
  }
  logger.info("Finished");
};

module.exports = {
  populateNews
};
