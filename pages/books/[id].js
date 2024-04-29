/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleBook } from '../../api/bookData';
import Loading from '../../components/Loading';

export default function ViewBook() {
  const [bookDetails, setBookDetails] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleBook(id).then(setBookDetails);
  }, [id]);

  const handleEdit = () => {
    router.push(`/books/edit/${bookDetails?.id}`);
  };

  if (!bookDetails.id) {
    return <Loading />;
  }

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={bookDetails.image} alt={bookDetails.title} style={{ width: '300px' }} />
      </div>
      <div style={{ color: 'white', marginTop: '20px' }}>
        <div style={{
          display: 'flex', justifyContent: 'left', gap: '10px', paddingBottom: '20px',
        }}
        >
          <button
            type="button"
            id="edit"
            className="fas fa-edit btn btn-info"
            onClick={handleEdit}
          >Edit
          </button>
          <button
            type="button"
            id="delete"
            className="btn btn-danger fas fa-trash-alt"
          >Delete
          </button>
        </div>
        <h5>
          {bookDetails.title} by
          {bookDetails.authors ? (
            bookDetails.authors.map((author) => (
              <h6 key={author.id}>
                {author.first_name} {author.last_name}
              </h6>
            ))
          ) : (
            <h6>Anonymous</h6>
          )}

          {bookDetails.authorObject?.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: {
          bookDetails.authors.map((author) => (
            <a href={`mailto:${author.email}`}> {author.email}{bookDetails.authors > 1 && ','}</a>
          ))
        }

        <p>{bookDetails.description || ''}</p>
        <hr />
        <p>
          {bookDetails.sale
            ? `🏷️ Sale $${bookDetails.price.toFixed(2, 0)}`
            : `$${bookDetails.price.toFixed(2, 0)}`}
        </p>
      </div>
    </div>
  );
}
