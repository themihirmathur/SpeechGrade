const mongoose = require("mongoose");
require("dotenv").config();
const logger = require('../logger/Logger')

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      logger.info("MongoDB Connected");
    })
    .catch((err) => {
      logger.error(err);
    });
};

module.exports = connectToDB;
