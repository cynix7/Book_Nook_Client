import Image from "next/image";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";

const BookDetails = ({ book }: {
  book: {
    title: string;
    author: string;
    category: string;
    description: string;
    imageUrl: string;
    userEmail: string;
  }

}) => {
  return (
    <div className="container mx-auto px-4 py-12">

      <Card className="overflow-hidden">
        <CardContent className="grid md:grid-cols-2 gap-8 p-6 md:p-10">

          
          <div className="flex justify-center items-center bg-muted rounded-xl p-6">
            <Image
              src={book.imageUrl}
              alt={book.title}
              width={350}
              height={450}
              className="rounded-lg object-contain max-h-112.5"
            />
          </div>

          
          <div className="flex flex-col gap-5">

            <div>
              <Badge>{book.category}</Badge>

              <h1 className="text-3xl font-bold mt-4">
                {book.title}
              </h1>

              <p className="text-muted-foreground mt-2">
                By {book.author}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="font-semibold text-lg mb-2">
                About This Book
              </h2>

              <p className="text-muted-foreground leading-7">
                {book.description}
              </p>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <UserRound className="size-5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Added by
                </p>
                <p className="font-medium">
                  {book.userEmail}
                </p>
              </div>
            </div>

            <div className="mt-auto pt-4">
                <Button>Borrow This Book</Button>
            </div>

          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default BookDetails;