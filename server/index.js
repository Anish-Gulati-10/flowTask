require("dotenv").config()
import connectDB from "./config/db.js";
import app from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection failed to MongoDB : ", err);
  });
