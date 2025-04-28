const List = require("../models/List.model");
const Task = require("../models/Task.model");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, listId } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const newTask = await Task.create({
      title,
      description,
      list: listId,
      dueDate,
      priority: priority || "low"
    });

    list.tasks.push(newTask._id);
    await list.save();

    return res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { title, description, dueDate, priority } = req.body;
  
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      if (title) task.title = title;
      if (description) task.description = description;
      if (dueDate) task.dueDate = dueDate;
      if (priority) task.priority = priority;
  
      await task.save();
      console.log("Task updated successfully:", task);
      return res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
      console.error("Error updating task:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const list = await List.findOne({ tasks: taskId });
    if (list) {
      list.tasks = list.tasks.filter((task) => task.toString() !== taskId);
      await list.save();
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
};
