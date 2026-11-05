"use client";
import React from 'react';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { getTokenFromClient } from '@/lib/getTokenFromClient';
interface BookType {
    _id: string;
    title: string;
    author: string;
    category: string;
    description: string;
    imageUrl: string;
    userEmail: string;
}

const Return = ({ book }: { book: BookType }) => {
    const router = useRouter();

    const handleReturn = async () => {
        const token=await getTokenFromClient();
        const res = await fetch(`http://localhost:8000/return-book/${book._id}`, {
            method: "DELETE",
            headers:{
                authorization:`Bearer ${token}`
            }
        });
        const result = await res.json();
        if(result.success) {
            toast.success("Book returned successfully!");
            router.refresh();
        } else {
            toast.error("Failed to return the book.");
        }
    };
    return (
        <Dialog>
            <DialogTrigger render={
                <Button variant="destructive" size="sm">
                      Return Book
                    </Button>
            } />

            <DialogContent className="sm:max-w-sm">

                <DialogClose render={
                    <Button onClick={handleReturn} className="bg-linear-to-br from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700">
                        Confirm Return
                    </Button>
                } />


            </DialogContent>
        </Dialog>
    );
};

export default Return;