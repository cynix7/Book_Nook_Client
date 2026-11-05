import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface BookType {
    _id: string;
    title: string;
    author: string;
    category: string;
    description: string;
    imageUrl: string;
    userEmail: string;
    totalCopies: number;
}

const Update = ({ book }: { book: BookType }) => {
    const router = useRouter();
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedBook = Object.fromEntries(formData.entries());
        console.log("Updated Book Data:", updatedBook);
        const res = await fetch(`http://localhost:8000/update-book/${book._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...updatedBook

            })
        });
        const result = await res.json();
        if (result.success) {
            toast.success("Book updated successfully!");
            router.refresh();
        }
        if (!result.success) {
            const errorData = await res.json();
            toast.error(`Error: ${errorData.message}`);
        }
    };
    return (
        <Dialog>
            <DialogTrigger render={
                <Button variant="outline">Edit</Button>
            } />

            <DialogContent className="sm:max-w-sm">

                <DialogHeader>
                    <DialogTitle>Update This Book</DialogTitle>
                    <DialogDescription>
                        Confirm your information before updating
                        <span className="font-semibold"> {book.title}</span>.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Book Title</Label>
                        <Input id="title" name="title" defaultValue={book.title} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="author">Author Name</Label>
                        <Input id="author" name="author" defaultValue={book.author} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <select
                            id="category"
                            name="category"
                            defaultValue={book.category}
                            required
                            className="w-full h-10 rounded-md border bg-background px-3 text-sm"
                        >
                            <option value="Fiction">Fiction</option>
                            <option value="Science">Science</option>
                            <option value="History">History</option>
                            <option value="Kids">Kids</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="imageUrl">Book Image URL</Label>
                        <Input
                            id="imageUrl"
                            name="imageUrl"
                            defaultValue={book.imageUrl}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={book.description}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="totalCopies">Total Copies</Label>
                        <Input
                            id="totalCopies"
                            name="totalCopies"
                            type="number"
                            min="1"
                            defaultValue={book.totalCopies}
                            required
                            placeholder="Enter total copies"
                        />
                    </div>

                    <DialogClose render={
                        <Button type="submit" className="bg-linear-to-br from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700">
                            Update Book
                        </Button>
                    } />
                </form>

            </DialogContent>
        </Dialog>
    );
};

export default Update;



