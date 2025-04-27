const Board = require("../models/Board.model");
const List = require("../models/List.model");

const createBoard = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Board title is required" });
    }

    const newBoard = await Board.create({
      title,
      description,
      owner: req.user.uid,
      members: [],
    });

    return res
      .status(201)
      .json({ message: "Board created successfully", board: newBoard });
  } catch (error) {
    console.error("Error creating board:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMyBoards = async (req, res) => {
  try {
    const ownedBoards = await Board.find({ owner: req.user.uid }).sort({createdAt: -1});
    const sharedBoards = await Board.find({ members: req.user.uid }).sort({ createdAt: -1 });

    if (ownedBoards.length === 0 && sharedBoards.length === 0) {
      return res.status(204).json([]);
    }

    return res.status(200).json({ ownedBoards, sharedBoards });
  } catch (error) {
    console.error("Error fetching boards:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getListsByBoardId = async (req, res) => {
  try {
    const { boardId } = req.params;
    if (!boardId) {
      return res.status(400).json({ message: "Board ID is required" });
    }
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    const boardName = board.title;
    if (board.owner.toString() !== req.user.uid && !board.members.includes(req.user.uid)) {
      board.members.push(req.user.uid);
      await board.save();
    }
    const lists = await List.find({ board: boardId }).sort({ position: 1 });  
    return res.status(200).json({ lists, boardName });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    if (!boardId) {
      return res.status(400).json({ message: "Board ID is required" });
    }
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    } 
    if (board.owner.toString() !== req.user.uid) {
      return res.status(403).json({ message: "You are not authorized to delete this board" });
    }
    await List.deleteMany({ board: boardId });
    await board.deleteOne();
    return res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    console.error("Error deleting board:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createBoard,
  getMyBoards,
  getListsByBoardId,
  deleteBoard,
};
