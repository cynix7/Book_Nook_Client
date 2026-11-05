"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { BookOpen, UserRound } from "lucide-react";

interface BookType {
    _id: string;
    title: string;
    author: string;
    category: string;
    description: string;
    imageUrl: string;
    userEmail: string;
}

interface MyBooksProps {
    books: BookType[];
}

export default function MyBooks({ books }: MyBooksProps) {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-10">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
                    Your Collection
                </p>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    My Books
                </h1>
                <p className="text-muted-foreground mt-2">
                    Manage and explore the books you&aposve added to our library.
                </p>
            </div>

            {/* Book Cards */}
            {books.length === 0 ? (
                <div className="border border-dashed rounded-2xl py-20 text-center">
                    <BookOpen className="mx-auto size-12 text-muted-foreground mb-4" />
                    <h2 className="text-xl font-semibold">No books added yet</h2>
                    <p className="text-muted-foreground mt-2">
                        Your collection will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <Card
                            key={book._id}
                            className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative h-64 overflow-hidden bg-muted">
                                <Image
                                    src={book.imageUrl}
                                    alt={book.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold">
                                    {book.category}
                                </span>
                            </div>

                            <CardContent className="p-5 space-y-3">
                                <div>
                                    <h2 className="text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                                        {book.title}
                                    </h2>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                        <UserRound className="size-4" />
                                        <span>{book.author}</span>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="px-5 py-auto flex gap-3">
                                <Button variant="outline" className="flex-1">
                                    Edit
                                </Button>

                                <Button variant="destructive" className="flex-1">
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}