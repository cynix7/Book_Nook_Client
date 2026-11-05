import Bookcard from "@/components/Bookcard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";

type Book = {
  _id: string;
  title?: string;
  author?: string;
  category?: string;
  imageUrl?: string;
};
async function fetchAllBooks(): Promise<Book[] | null> {
  try {
    const res = await fetch(`http://localhost:8000/all-books`);
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}
export default async function AllBooksPage() {
  const allBooks = await fetchAllBooks();
  console.log("All Books:", allBooks);
  return (
    <section className="mt-10 container mx-auto">
      <h2 className="font-heading text-2xl font-bold">All Books</h2>

      {allBooks === null ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Couldn&apos;t load all books — is the server running?
        </p>
      ) : allBooks.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No books yet</p>
      ) : (
        <Bookcard books={allBooks} />
      )}

      <div className="mt-8 flex justify-center">
        <Link
          href="/all-books"
          className={cn(
            buttonVariants({ variant: "default" }),
            "h-10 gap-2 bg-linear-to-br from-orange-500 to-red-600 px-6 text-white hover:from-orange-600 hover:to-red-700",
          )}
        >
          See All Books
        </Link>
      </div>
    </section>
  );
}
