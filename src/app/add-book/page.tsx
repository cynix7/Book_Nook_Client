"use client";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(
        `http://localhost:8000/add-book`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data }),
        },
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      toast.success("Book added successfully");
      form.reset();
    } catch {
      toast.error("Could not add the book. Is the server running?");
    } 
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
      <h1 className="font-heading text-2xl font-bold">Add Book</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Fill in the details below to add a new book to the library.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid max-w-2xl gap-5 rounded-lg border border-border p-6"
      >
        <div className="grid gap-2">
          <Label htmlFor="title">Book Title</Label>
          <Input
            id="title"
            name="title"
            required
            placeholder="The Great Gatsby"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="author">Author Name</Label>
          <Input
            id="author"
            name="author"
            required
            placeholder="F. Scott Fitzgerald"
          />
        </div>

        <div className="grid gap-2">
          <Label>Category</Label>
          <Select name="category" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="imageUrl">Book Image (URL)</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            required
            placeholder="https://example.com/cover.jpg"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            id="description"
            name="description"
            required
            placeholder="A short summary of the book..."
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="userName">User Name</Label>
          <Input
            id="userName"
            name="userName"
            required
            placeholder="Your name"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="userEmail">User Email</Label>
          <Input
            id="userEmail"
            name="userEmail"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>

        <Button
          type="submit"
          className="justify-self-start"
        >
          Add Book
        </Button>
      </form>
    </main>
  );
}
