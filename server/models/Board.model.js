const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
}, {
  timestamps: true
});

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
