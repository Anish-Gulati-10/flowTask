const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const listSchema = new mongoose.Schema({
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
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  }],
  position: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const List = mongoose.model("List", listSchema);
module.exports = List;
