import mongoose from "mongoose";

const connectDB = (URL) => {
  const OPTIONS = {
    dbname: process.env.DB_NAME,
  };

  mongoose
    .connect(URL, OPTIONS)
    .then(() => {
      console.log("Connnected Successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDB;
