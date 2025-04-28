import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/datePicker";
import axiosInstance from "@/utils/axiosInstance";

const TaskDialog = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localTask, setLocalTask] = useState(task);
  const [taskName, setTaskName] = useState(task.title || "");
  const [taskDescription, setTaskDescription] = useState(
    task.description || ""
  );
  const [taskDueDate, setTaskDueDate] = useState(task.dueDate || null);
  const [taskPriority, setTaskPriority] = useState(task.priority || "low");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDeletion = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`/tasks/${localTask._id}`);
      if (response.status === 200) {
        setLocalTask(null); // or handle task removal from the list
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      setErrorMsg("Failed to delete task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (taskId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.patch(`/tasks/${taskId}`, {
        title: taskName,
        description: taskDescription,
        dueDate: taskDueDate,
        priority: taskPriority,
      });
      if (response.status === 200) {
        setLocalTask(response.data.task);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      setErrorMsg("Failed to update task. Please try again.");
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  if (!localTask) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-4 border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer flex flex-col gap-2 hover:shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold line-clamp-1">
              {localTask.title}
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1">
              <span className="capitalize">{localTask.priority}</span>
              <div
                className={`w-2 h-2 rounded-full ${
                  localTask.priority === "high"
                    ? "bg-red-500"
                    : localTask.priority === "medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {localTask.description}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className={"mt-2.5"}>
          <DialogTitle>
            <div className="flex items-center justify-between">
              {localTask.title}
              <div className="flex-center gap-1">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  disabled={loading}>
                  <Pencil />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDeletion()}
                  disabled={loading}>
                  <Trash />
                </Button>
              </div>
            </div>
          </DialogTitle>
          {localTask.description && (
            <DialogDescription>{localTask.description}</DialogDescription>
          )}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isEditing && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="taskName" className="text-left">
                Task Name
              </Label>
              <Input
                id="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task Name"
                className="col-span-3"
                disabled={!isEditing || loading}
              />
            </div>
          )}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="taskDescription" className="text-left">
              Description
            </Label>
            <Textarea
              id="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Task Description"
              className="col-span-3"
              disabled={!isEditing || loading}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-left">
              Due Date
            </Label>
            <div className="col-span-3">
              <DatePicker
                date={taskDueDate}
                setDate={setTaskDueDate}
                disabled={!isEditing || loading}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-left">
              Priority
            </Label>
            <Select
              value={taskPriority}
              onValueChange={setTaskPriority}
              disabled={!isEditing || loading}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {isEditing && (
          <DialogFooter className="flex !flex-col gap-2">
            {errorMsg && <span className="text-red-500">{errorMsg}</span>}
            <Button
              onClick={() => handleUpdateTask(localTask._id)}
              disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
