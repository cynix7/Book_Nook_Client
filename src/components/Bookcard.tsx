import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const Bookcard = ({ books }: { books:{ _id: string; title?: string; author?: string; category?: string; imageUrl?: string }[] }) => {
    return (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div
              key={book._id}
              className="group overflow-hidden rounded-lg border border-border bg-background transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg"
            >
              <div className="relative aspect-3/4 overflow-hidden bg-muted">
                {book.imageUrl ? (
                  <Image
                    src={book.imageUrl}
                    alt={book.title ?? "Book cover"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    No image
                  </div>
                )}
                {book.category && (
                  <span className="absolute top-3 left-3 z-10 rounded-full border border-border/60 bg-background/85 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                    {book.category}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-heading leading-snug font-semibold">
                  {book.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {book.author}
                </p>
                <Link
                  href={`/books/${book._id}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "mt-4 w-full transition-colors",
                  )}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
    );
};

export default Bookcard;