const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;
const notFound = require("./handlers/404");
const errorHandler = require("./handlers/500");
const stamper = require("./middleware/stamper");
const logger = require("./middleware/logger");
const validator = require("./middleware/validator");

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "All our dreams can come true, if we have the courage to pursue them 💪👨‍💻️"
    );
});

app.get("/person", validator, (req, res) => {
  const { name } = req.query;
  res.status(200).json({ name: name });
});

app.get("/data", stamper, (req, res) => {
  const outputObject = {
    10: "even",
    5: "odd",
    time: req.timestamp,
  };
  res.status(200).json(outputObject);
});

app.get("/bad", (req, res, next) => {
  throw new Error("You made an Error 🚫❌");
});

app.use("*", notFound);
app.use(logger);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = {
  start,
  app,
};
