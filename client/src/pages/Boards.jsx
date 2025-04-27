import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
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
import { Trash } from "lucide-react";

const Boards = () => {
  const [ownedBoards, setOwnedBoards] = useState([]);
  const [sharedBoards, setSharedBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axiosInstance.get("/boards");
        if (response.status === 204) {
          setOwnedBoards([]);
          setSharedBoards([]);
          return;
        }
        if (response.status === 401) {
          setErrorMsg("Unauthorized access. Please log in.");
          navigate("/login");
          return;
        }
        const { ownedBoards: owned, sharedBoards: shared } = response.data;
        setOwnedBoards(owned);
        setSharedBoards(shared);
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  const handleCreateBoard = async (title, description) => {
    try {
      if (!title) {
        setErrorMsg("Board title is required");
        return;
      }

      const response = await axiosInstance.post("/boards/create", {
        title,
        description,
      });

      if (response.status === 201) {
        setOwnedBoards((prev) => [response.data.board, ...prev]);
        setTitle("");
        setDescription("");
        navigate(`/boards/${response.data.board._id}`);
      }
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const handleDeletion = async (boardId) => {
    try {
      const response = await axiosInstance.delete(`/boards/${boardId}`);
      if (response.status === 200) {
        setOwnedBoards((prev) => prev.filter((board) => board._id !== boardId));
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  }


  if (ownedBoards.length === 0 && sharedBoards.length === 0) {
    return (
      <section className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-center flex-col px-2 sm:px-4 py-2 flex-1 gap-4 max-w-96 mx-auto">
          <h1 className="text-center text-xl font-semibold">
            No boards available
          </h1>
          <p className="text-center text-gray-500">
            You don't have any boards yet. You can create a new one or ask your
            team to share an existing one with you.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create a New Board</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a New Board</DialogTitle>
                <DialogDescription>
                  Create a new board to organize your tasks and projects.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="boardName" className="text-left">
                    Board Name
                  </Label>
                  <Input
                    id="boardName"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="My First Board"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-left">
                    Description
                  </Label>
                  <Textarea
                    id="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A brief description of the board"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter className="flex !flex-col gap-2">
                {errorMsg && <span className="text-red-500">{errorMsg}</span>}
                <Button onClick={() => handleCreateBoard(title, description)}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="px-2 md:px-10 sm:px-5 py-2 mt-6">
        {ownedBoards.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Your Boards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {ownedBoards.map((board) => (
                <div
                  key={board._id}
                  className="bg-white dark:bg-background shadow-sm rounded-md overflow-hidden">
                  <div className="p-4 bg-[#2073f7] text-white flex items-center justify-between">
                    <h3 className="text-lg font-bold tracking-wide">
                      {board.title}
                    </h3>
                    <Trash className="hover:cursor-pointer hover-scale-on" onClick={() => handleDeletion(board._id)}/>
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <p className="text-gray-600 dark:text-gray-400 text-base">
                      {board.description || "No description"}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {board.members.length} members
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/boards/${board._id}`)}>
                        View Board
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-white dark:bg-background shadow-sm rounded-md overflow-hidden">
                <CreateNewBoardCard onBoardCreate={handleCreateBoard}/>
              </div>
            </div>
          </div>
        )}

        {/* Shared Boards */}
        {sharedBoards.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Shared With You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sharedBoards.map((board) => (
                <div
                  key={board._id}
                  className="bg-white dark:bg-background shadow-sm rounded-md overflow-hidden">
                  <div className="p-4 bg-[#a74bfd] text-white">
                    <h3 className="text-lg font-bold tracking-wide">
                      {board.title}
                    </h3>
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <p className="text-gray-600 dark:text-gray-400 text-base">
                      {board.description || "No description"}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {board.members.length} members
                      </p>
                      <Button
                        variant="outline"
                        className="hover-scale-on"
                        onClick={() => navigate(`/boards/${board._id}`)}>
                        View Board
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {ownedBoards.length === 0 && (
                <div className="bg-white dark:bg-background shadow-sm rounded-md overflow-hidden">
                  <CreateNewBoardCard onBoardCreate={handleCreateBoard}/>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Boards;
