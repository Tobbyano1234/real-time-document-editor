import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Img2 from "../assets/Create-New-Image.png";
import { createDocumentReq } from "../services/apiRequests";
import toast from "react-hot-toast";

export function Dialogbox() {
  const navigate = useNavigate();
  const [docName, setDocName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!docName.trim()) {
      toast.error("Please enter a document name");
      return;
    }

    setIsLoading(true);
    try {
      const res = await createDocumentReq({ name: docName });
      if (res.statusCode === 201) {
        navigate(`/documents/${res.payload._id}`);
        toast.success("Document created successfully");
      } else {
        toast.error(res.message || "Failed to create document");
      }
    } catch (error) {
      toast.error("Failed to create document");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border p-2 bg-white border-gray-300 h-[200px] w-[160px] rounded-md hover:border-blue-600">
      <Dialog>
        <DialogTrigger asChild>
          <img
            className="h-full w-full cursor-pointer"
            src={Img2}
            alt="createImg"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a new document</DialogTitle>
            <DialogDescription>
              Enter a name for your document. Click create when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Untitled document"
                className="col-span-3"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              style={{"backgroundColor": "rgb(10, 110, 209)"}} 
              type="submit" 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
