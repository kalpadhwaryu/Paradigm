const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
    });
    console.log(`Connected to Database`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
