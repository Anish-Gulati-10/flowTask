import BoardNavbar from "@/components/BoardNavbar";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import CreateNewBoardCard from "@/components/CreateNewBoardCard";
import { Plus, Trash } from "lucide-react";

const colors = [
  "#60a5fa", // Blue-400
  "#f59e0b", // Amber-500
  "#10b981", // Emerald-500
  "#6366f1", // Indigo-500
  "#ec4899", // Pink-500
  "#f43f5e", // Rose-500
  "#84cc16", // Lime-500
  "#a855f7", // Purple-500
];

const BoardView = () => {
  const [lists, setLists] = useState([]);
  const [boardTitle, setBoardTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [listTitle, setListTitle] = useState("");
  const { boardId } = useParams();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axiosInstance.get(`/boards/${boardId}/lists`);
        if (response.status === 401) {
          setErrorMsg("Unauthorized access. Please log in.");
          navigate("/login");
          return;
        }
        if (response.status === 404) {
          setErrorMsg(response.data.message);
          navigate("/boards");
          return;
        }
        const { lists: fetchedLists, boardName } = response.data;
        console.log(response.data);
        setBoardTitle(boardName);
        setLists(fetchedLists);
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (boardId) {
      fetchLists();
    }
  }, [boardId]);

  const handleCreateList = async () => {
    try {
      if (!listTitle) {
        setErrorMsg("List title is required");
        return;
      }
      const response = await axiosInstance.post(`lists/create`, {
        title: listTitle,
        boardId: boardId,
      });
      if (response.status === 201) {
        setLists((prevLists) => [...prevLists, response.data.list]);
        setListTitle("");
      }
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg(error.message || "Failed to create list. Please try again.");
    }
  };

  const handleDeletion = async (listId) => {
    try {
      const response = await axiosInstance.delete(`lists/${listId}`);
      if (response.status === 200) {
        setLists((prevLists) => prevLists.filter((list) => list._id !== listId));
      }
    } catch (error) {
      console.error("Error deleting list:", error);
      setErrorMsg(error.message);
    }
  }

  if (lists.length === 0) {
    return (
      <section className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
        <BoardNavbar boardName={boardTitle} />
        <div className="flex-center flex-col px-2 sm:px-4 py-2 flex-1 gap-4 max-w-96 mx-auto">
          <h1 className="text-center text-xl font-semibold">
            No lists available
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create a New List</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a New List</DialogTitle>
                <DialogDescription>
                  Create a new list to organize your tasks.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="listName" className="text-left">
                    List Name
                  </Label>
                  <Input
                    id="listName"
                    value={listTitle}
                    onChange={(e) => setListTitle(e.target.value)}
                    placeholder="To Do"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter className="flex !flex-col gap-2">
                {errorMsg && <span className="text-red-500">{errorMsg}</span>}
                <Button onClick={handleCreateList}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    );
  }

  return (
    <section className="h-screen bg-gray-100 dark:bg-gray-900 flex flex-col gap-6">
      <BoardNavbar boardName={boardTitle} />
      <div className="px-2 md:px-10 sm:px-5 py-2 h-full">
        <div className="flex flex-wrap sm:flex-nowrap gap-6 overflow-x-auto pb-4 h-full">
          {lists.map((list) => {
            const randomColor =
              colors[Math.floor(Math.random() * colors.length)];
            return (
              <div
                key={list._id}
                className="flex-shrink-0 w-full sm:w-[300px] md:w-[450px] bg-white dark:bg-background shadow-sm rounded-md overflow-hidden h-full">
                <div className="p-4 text-white flex items-center justify-between" style={{ backgroundColor: randomColor }}>
                  <h3 className="text-lg font-bold tracking-wide">
                    {list.title}
                  </h3>
                  <Trash
                    className="hover:cursor-pointer hover-scale-on"
                    onClick={() => handleDeletion(list._id)}
                  />
                </div>
                <div className="p-4 flex flex-col gap-3">
                  {/* Later you can map tasks here */}
                </div>
              </div>
            );
          })}
          <div className="flex-shrink-0 w-full sm:w-[300px] md:w-[450px] bg-white dark:bg-background shadow-sm rounded-md overflow-hidden">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex flex-col items-center justify-center h-full w-full p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition rounded-md ">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-3">
                    <Plus className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
                    Add a New List
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create a New List</DialogTitle>
                  <DialogDescription>
                    Create a new list to organize your tasks.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="listName" className="text-left">
                      List Name
                    </Label>
                    <Input
                      id="listName"
                      value={listTitle}
                      onChange={(e) => setListTitle(e.target.value)}
                      placeholder="In Progress"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter className="flex !flex-col gap-2">
                  {errorMsg && <span className="text-red-500">{errorMsg}</span>}
                  <Button onClick={handleCreateList}>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardView;
