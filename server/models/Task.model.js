const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const taskSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true
  },
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
  position: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
