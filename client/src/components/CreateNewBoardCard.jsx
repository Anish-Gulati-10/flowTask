import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const CreateNewBoardCard = ({ onBoardCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const handleCreateBoard = async () => {
    try {
      if (!title) {
        setErrorMsg("Board title is required");
        return;
      }
      await onBoardCreate(title, description);
      setTitle("");
      setDescription("");
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center justify-center h-full w-full p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition rounded-md ">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-3">
            <Plus className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
            Create A New Board
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Board</DialogTitle>
          <DialogDescription>
            Organize your tasks and projects in a new board.
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
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of the board"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-2">
          {errorMsg && <span className="text-red-500 text-sm">{errorMsg}</span>}
          <Button onClick={handleCreateBoard}>Create Board</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewBoardCard;
