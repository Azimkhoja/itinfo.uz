const user = require("./user.validator");
const admin = require("./admin.validator");
const email_pass = require("./email.pass.validator");
const author = require("./author.validator");
const category = require("./category.validator");
const topic = require("./topic.validator");
const description = require("./description");
const social = require("./social");
const tag = require("./tag");
const desc_topic = require("./desc_topic.validator");
const dictionary = require("./dictionary");
const author_social = require("./author_social");
const question_answer = require("./question_answer");
const desc_QA = require("./desc_QA");
const synonim = require("./synonim");
const media = require("./media");

module.exports = {
  admin,
  user,
  email_pass,
  author,
  category,
  topic,
  description,
  social,
  tag,
  desc_topic,
  dictionary,
  author_social,
  question_answer,
  desc_QA,
  synonim,
  media,
};
