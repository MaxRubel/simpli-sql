import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleBook } from '../../../api/bookData';
import BookForm from '../../../components/forms/BookForm';

export default function EditBook() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleBook(id).then(setEditItem);
  }, [id]);

  return (<BookForm obj={editItem} />);
}
