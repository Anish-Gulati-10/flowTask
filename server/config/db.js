const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(`\nMongoDB connected ! DB Host : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Error while connecting DB", error);
    process.exit(1);
  }
};

module.exports = connectDB;