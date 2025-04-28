const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
    required: true
  },
  comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }],
  dueDate: {
    type: Date
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low"
  }
}, {
  timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
