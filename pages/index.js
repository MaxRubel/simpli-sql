/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getBooks } from '../api/bookData';
import { useAuth } from '../utils/context/authContext';
import BookCard from '../components/BookCard';

function Home() {
  const [books, setBooks] = useState([]);

  const getAllTheBooks = () => {
    getBooks().then((bookData) => {
      setBooks(bookData);
    });
  };

  useEffect(() => {
    getAllTheBooks();
  }, []);

  return (
    <div className="text-center my-4" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <div>
        <Link href="/books/new" passHref>
          <Button style={{ width: '18rem', margin: '10px' }}>Add A Book</Button>
        </Link>
      </div>
      <div className="d-flex flex-wrap" style={{ justifyContent: 'center' }}>
        {books.map((book) => (
          <BookCard key={book.id} bookObj={book} onUpdate={getAllTheBooks} />
        ))}
      </div>
    </div>
  );
}

export default Home;
