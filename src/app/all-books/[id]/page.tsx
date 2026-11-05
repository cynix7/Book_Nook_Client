import BookDetails from '@/components/BookDetails';
import React from 'react';

const booksDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:8000/book/${id}`);
    const book = await res.json();
    return (
        <div>
            <BookDetails book={book} />
        </div>
    );
};

export default booksDetailsPage;