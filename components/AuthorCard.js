/* eslint-disable react/prop-types */
// import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteAuthorBooks } from '../api/mergedData';
import { deleteSingleAuthor } from '../api/authorData';

const AuthorCard = ({ authorObj, onUpdate }) => {
  const router = useRouter();

  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${authorObj.first_name} ${authorObj.last_name}?`)) {
      deleteSingleAuthor(authorObj.id).then(() => {
        onUpdate();
      });
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{`${authorObj.first_name} ${authorObj.last_name}`}</Card.Title>
        <Card.Subtitle>{authorObj.email}</Card.Subtitle>
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
