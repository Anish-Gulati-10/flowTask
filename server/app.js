const express = require("express");
const cors = require("cors");
const CorsOptions = require("./config/CorsOptions.js");
const authRouter = require("./routes/auth.routes.js");
const boardRouter = require("./routes/board.routes.js");
const listRouter = require("./routes/list.routes.js");
const taskRouter = require("./routes/task.routes.js");
const commentRouter = require("./routes/comment.routes.js");

const app = express();

app.use(cors(CorsOptions));
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Flow Task API" });
});
app.use("/api/auth", authRouter);
app.use("/api/boards", boardRouter);
app.use("/api/lists", listRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/comment", commentRouter);

module.exports = app;
