const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const { updateTask, createTask } = require('../controllers/task.controller')

const taskRouter = express.Router()

taskRouter.use(verifyToken)

taskRouter.post("/create", createTask)
taskRouter.patch("/:taskId", updateTask)


module.exports = taskRouter
