/* eslint-disable react/prop-types */
// import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { deleteSingleAuthor, updateAuthor } from '../api/authorData';

const AuthorCard = ({ authorObj, onUpdate }) => {
  // const [loved, setLoved] = useState(0);
  const router = useRouter();
  const [loved, setLoved] = useState(0);
  useEffect(() => {
    if (authorObj?.favorite) {
      setLoved(authorObj.favorite);
    }
  }, [authorObj]);

  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${authorObj.first_name} ${authorObj.last_name}?`)) {
      deleteSingleAuthor(authorObj.id).then(() => {
        onUpdate();
      });
    }
  };

  const handleClick = () => {
    const newLoved = loved === 0 ? 1 : 0;
    setLoved(newLoved);
    const payload = {
      ...authorObj,
      favorite: newLoved,
    };
    updateAuthor(payload);
  };

  const heart = (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      type="button"
      style={{ backgroundColor: 'transparent', border: 'none' }}
      onClick={handleClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: 'none' }} width="24" height="24" fill="black" className="bi bi-heart" viewBox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
      </svg>
    </button>
  );

  const filledHeart = (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      onClick={handleClick}
      type="button"
      style={{ backgroundColor: 'transparent', border: 'none' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: 'none' }} width="24" height="24" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
      </svg>
    </button>
  );

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{`${authorObj.first_name} ${authorObj.last_name}`}</Card.Title>
        <Card.Subtitle>{authorObj.email}</Card.Subtitle>
        <div style={{ display: 'flex', justifyContent: 'center' }}>{loved ? filledHeart : heart}</div>
        <div style={{ paddingTop: '10px', display: 'flex', gap: '10px' }}>
          <Link href={`/authors/${authorObj.id}`} passHref>
            <Button variant="success">VIEW</Button>
          </Link>
          <Link href={`/authors/edit/${authorObj.id}`} passHref>
            <Button
              variant="info"
              onClick={() => {
                router.push(`/authors/edit/${authorObj.id}`);
              }}
            >EDIT
            </Button>
          </Link>
          <Button variant="danger" onClick={deleteThisAuthor}>
            DELETE
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AuthorCard;
