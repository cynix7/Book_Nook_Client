import BookDetails from '@/components/BookDetails';
import { notFound } from "next/navigation";

const booksDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:8000/book/${id}`);
    if (res.status === 404 || res.status === 500) notFound();

    const book = await res.json();
    return (
        <div>
            <BookDetails book={book} />
        </div>
    );
};

export default booksDetailsPage;