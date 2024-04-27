import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthorForm from '../../../components/forms/AuthorForm';
import { getSingleAuthor } from '../../../api/authorData';

export default function EditAuthor() {
  const [authorObj, setAuthorObj] = useState(null);
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleAuthor(id).then((data) => {
      setAuthorObj(data);
    });
  }, [id]);

  return (
    <AuthorForm obj={authorObj} />
  );
}
