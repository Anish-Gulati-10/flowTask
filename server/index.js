require("dotenv").config()
const app = require("./app.js")
const connectDB = require("./config/db.js")

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection failed to MongoDB : ", err);
  });
