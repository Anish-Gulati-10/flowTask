const express = require("express");

const verifyToken = require("../middleware/verifyToken");
const {
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");

const commentRouter = express.Router();

commentRouter.use(verifyToken);

commentRouter.post("/:taskId", createComment);
commentRouter.patch("/:commentId", updateComment);
commentRouter.delete("/:commentId", deleteComment);

module.exports = commentRouter;
