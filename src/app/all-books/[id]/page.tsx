import BookDetails from '@/components/BookDetails';
import { getTokenFromServer } from '@/lib/getTokenFromServer';
import { notFound } from "next/navigation";

const booksDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const token= await getTokenFromServer();
    const res = await fetch(`http://localhost:8000/book/${id}`,{
        headers:{
            authorization:`Bearer ${token}`
        }
    });
    if (res.status === 404 || res.status === 500) notFound();

    const book = await res.json();
    return (
        <div>
            <BookDetails book={book} />
        </div>
    );
};

export default booksDetailsPage;