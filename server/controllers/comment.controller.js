const Comment = require("../models/Comment.model");
const Task = require("../models/Task.model");

const createComment = async (req, res) => {
  try {
    
    const { taskId } = req.params;
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const comment = await Comment.create({
      task: taskId,
      userId: req.user.uid,
      authorUsername: req.user.username,
      content,
    });

    if (comment) {
      task.comments.push(comment._id);
      await task.save();
    }

    return res
      .status(201)
      .json({ message: "Comment created successfully", comment });
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    comment.content = content || comment.content;
    await comment.save();

    return res
      .status(200)
      .json({ message: "Comment updated successfully", comment });
  } catch (error) {
    console.error("Error updating comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId.toString() !== req.user.uid) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const task = await Task.findById(comment.task);
    if (task) {
      task.comments = task.comments.filter((c) => c.toString() !== commentId);
      await task.save();
    }

    await comment.deleteOne();

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
