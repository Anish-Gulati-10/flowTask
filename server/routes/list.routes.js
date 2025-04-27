const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const { createList, deleteList } = require('../controllers/list.controller')

const listRouter = express.Router()

listRouter.use(verifyToken)

listRouter.post("/create", createList)
listRouter.delete("/:listId", deleteList)


module.exports = listRouter
