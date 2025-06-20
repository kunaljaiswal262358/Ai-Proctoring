const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config()

const connectionStr = process.env.MONGO_URI;

const connectToDB = () => {
  mongoose
    .connect(connectionStr)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("Database connection failed.");
      console.log(err);
    });
};

module.exports = connectToDB;