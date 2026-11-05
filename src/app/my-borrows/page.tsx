import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface BorrowType {
  _id: string;
  title: string;
  imageUrl: string;
  borrowDate: string;
  returnDate: string;
  userEmail: string;
}

export default async function MyBorrowsPage() {
  const session = await auth.api.getSession({
      headers: await headers() 
  })
  const userEmail = session?.user?.email;
  const res = await fetch(`http://localhost:8000/my-borrows?email=${userEmail}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch borrowed books");
  }

  const data: BorrowType[] = await res.json();

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          My Borrowed Books
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your borrowed books and return dates.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="border border-dashed rounded-2xl py-20 text-center">
          <h2 className="text-xl font-semibold">No borrowed books</h2>
          <p className="text-muted-foreground mt-2">
            You haven&apos;t borrowed any books yet.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Book Title</TableHead>
                <TableHead>Borrow Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((book) => (
                <TableRow key={book._id}>
                  <TableCell>
                    <div className="relative w-14 h-16 rounded-md overflow-hidden">
                      <Image
                        src={book.imageUrl}
                        alt={book.title}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  </TableCell>

                  <TableCell className="font-semibold">
                    {book.title}
                  </TableCell>

                  <TableCell>
                    {new Date(book.borrowDate).toLocaleDateString("en-GB")}
                  </TableCell>

                  <TableCell>
                    {new Date(book.returnDate).toLocaleDateString("en-GB")}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button variant="destructive" size="sm">
                      Return Book
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <p className="text-sm text-muted-foreground mt-4">
        Total borrowed books: {data.length}
      </p>
    </div>
  );
}