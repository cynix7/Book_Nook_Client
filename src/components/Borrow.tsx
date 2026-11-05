"use client";

import React from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Borrow = ({ book }: {
    book: {
        title: string;
        author: string;
        category: string;
        description: string;
        imageUrl: string;
        userEmail: string;
        _id: string;
        totalCopies: number;
    };
}) => {
    const router = useRouter();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const borrowDate = new Date();

const returnDate = new Date();
returnDate.setDate(returnDate.getDate() + 14);

    const handleBorrow = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userEmail = formData.get("userEmail") as string;

    const res = await fetch("http://localhost:8000/borrow-book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            bookId: book._id, 
            userEmail,
            title: book.title,
            imageUrl: book.imageUrl,
            borrowDate,
            returnDate,
        }),
    });

    const result = await res.json();

    if (!res.ok) {
        toast.error(result.message || "Failed to borrow book");
        return;
    }

    toast.success("Book borrowed successfully!");
    router.push(`/all-books/${book._id}`);
};

    return (
        <Dialog>
            <DialogTrigger render={
                book.totalCopies > 0 ? (
  <Button variant={"outline"}>Borrow</Button>
) : (
  <Button disabled>Not Available</Button>
)
            } />

            <DialogContent className="sm:max-w-sm">

                <DialogHeader>
                    <DialogTitle>Borrow This Book</DialogTitle>
                    <DialogDescription>
                        Confirm your information before borrowing
                        <span className="font-semibold"> {book.title}</span>.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleBorrow}>
                    <FieldGroup>

                        <Field>
                            <Label htmlFor="userName">User Name</Label>
                            <Input
                                id="userName"
                                name="userName"
                                defaultValue={user?.name || ""}
                                readOnly
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="userEmail">User Email</Label>
                            <Input
                                id="userEmail"
                                name="userEmail"
                                type="email"
                                defaultValue={user?.email || ""}
                                readOnly
                            />
                        </Field>

                    </FieldGroup>

                    <DialogFooter className="mt-5">
                        <DialogClose render={
                            <Button variant="outline">Cancel</Button>
                        } />

                        <DialogClose render={
                            <Button type="submit" className="bg-linear-to-br from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700">
                                Confirm Borrow
                            </Button>
                        } />
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    );
};

export default Borrow;