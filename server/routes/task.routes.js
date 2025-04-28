const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const { updateTask, createTask, deleteTask, moveTask } = require('../controllers/task.controller')

const taskRouter = express.Router()

taskRouter.use(verifyToken)

taskRouter.post("/create", createTask)
taskRouter.patch("/:taskId", updateTask)
taskRouter.delete("/:taskId", deleteTask)
taskRouter.patch("/move/:taskId", moveTask)


module.exports = taskRouter
