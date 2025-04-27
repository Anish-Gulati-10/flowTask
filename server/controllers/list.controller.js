const Board = require("../models/Board.model");
const List = require("../models/List.model");

const createList = async (req, res) => {
  try {
    const { title, boardId } = req.body;

    if (!title) {
      return res.status(400).json({ message: "List title is required" });
    }

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Count how many lists already exist in the board (for positioning)
    const listCount = await List.countDocuments({ board: boardId });

    const newList = await List.create({
      title,
      board: boardId,
      position: listCount, // New list goes to the end
    });

    return res
      .status(201)
      .json({ message: "List created successfully", list: newList });
  } catch (error) {
    console.error("Error creating list:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteList = async (req, res) => {
  try {
    const { listId } = req.params;
    if (!listId) {
      return res.status(400).json({ message: "List ID is required" });
    }
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    } 
    await List.deleteOne({ _id: listId });
    return res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    console.error("Error deleting board:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
    createList,
    deleteList,
}