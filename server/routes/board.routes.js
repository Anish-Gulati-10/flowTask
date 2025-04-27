const express = require('express')
const { createBoard, getMyBoards, getListsByBoardId } = require('../controllers/board.controller')
const verifyToken = require('../middleware/verifyToken')

const boardRouter = express.Router()

boardRouter.use(verifyToken)

boardRouter.post("/create", createBoard)
boardRouter.get("/", getMyBoards)
boardRouter.get("/:boardId/lists", getListsByBoardId)

module.exports = boardRouter
