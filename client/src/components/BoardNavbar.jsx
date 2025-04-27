import React, { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, Check, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const BoardNavbar = ({ boardName }) => {
  const navigate = useNavigate();

  return (
    <nav className="w-full h-20 shadow-sm border-b px-2 md:px-10 sm:px-5 py-2 flex justify-between items-center bg-background">
      <div className="text-xl font-bold flex items-center gap-1">
        <ArrowLeft
          onClick={() => navigate("/boards")}
          className="hover:cursor-pointer"
        />
        {boardName}
      </div>
      <div className="flex items-center">
        <DialogCloseButton />
      </div>
    </nav>
  );
};

function DialogCloseButton() {
  const [copied, setCopied] = useState(false);
  const fullLink = window.location.href;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset "copied" message after 2 seconds
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Invite Members</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this board.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={fullLink} readOnly />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
            {copied ? (
              <>
                <span className="sr-only">Copied!</span>
                <Check />
              </>
            ) : (
              <>
                <span className="sr-only">Copy</span>
                <Copy />
              </>
            )}
            <span className="sr-only">Copy</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BoardNavbar;
