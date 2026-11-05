"use client"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
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

const Delete = ({ book }: { book: BookType }) => {
    const router = useRouter();

    const handleDelete = async () => {
        const token=await getTokenFromClient();
        const res = await fetch(`http://localhost:8000/delete-book/${book._id}`, {
            method: "DELETE",
            headers:{
                authorization:`Bearer ${token}`
            }
        });
        const result = await res.json();
        if(result.success) {
            toast.success("Book deleted successfully!");
            router.refresh();
        } else {
            toast.error("Failed to delete the book.");
        }
    };
    return (
        <Dialog>
            <DialogTrigger render={
                <Button variant="outline">Delete</Button>
            } />

            <DialogContent className="sm:max-w-sm">

                <DialogHeader>
                    <DialogTitle> <Button variant="outline">Delete</Button> </DialogTitle>
                </DialogHeader>

                <DialogClose render={
                    <Button onClick={handleDelete} className="bg-linear-to-br from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700">
                        Confirm Delete
                    </Button>
                } />


            </DialogContent>
        </Dialog>
    );
};

export default Delete;