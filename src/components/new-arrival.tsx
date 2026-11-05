import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import Bookcard from "./Bookcard";

type Book = {
  _id: string;
  title?: string;
  author?: string;
  category?: string;
  imageUrl?: string;
};

async function fetchNewArrivals(): Promise<Book[] | null> {
  try {
    const res = await fetch(`http://localhost:8000/new-arrivals`);
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

const NewArrival = async () => {
  const newBooks = await fetchNewArrivals();

  return (
    <section className="mt-10 container mx-auto">
      <h2 className="font-heading text-2xl font-bold">New Arrivals</h2>

      {newBooks === null ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Couldn&apos;t load new arrivals — is the server running?
        </p>
      ) : newBooks.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No books yet</p>
      ) : (
        <Bookcard books={newBooks} />
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
};

export default NewArrival;
