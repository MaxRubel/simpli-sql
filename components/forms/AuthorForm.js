/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createAuthor, updateAuthor } from '../../api/authorData';

const initialState = {
  id: '',
  first_name: '',
  last_name: '',
  image: '',
  email: '',
  favorite: false,
};

function AuthorForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (obj?.id) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj?.id) {
      updateAuthor(formInput).then(() => {
        router.push(`/authors/${formInput.id}`);
      });
    } else {
      createAuthor(formInput).then(() => {
        router.push('/authors/view-all');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj?.id ? 'Update' : 'Create'} Author</h2>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* LAST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Last Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Author Last Name"
          name="last_name"
          value={formInput.last_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* EMAIL INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Email" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter an Email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Image" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Add an Image"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* RADIO SWTICH FOR FAVORITE */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked ? 1 : 0,
          }));
        }}
      />
      <Button type="submit">{obj?.id ? 'Update' : 'Create'} Author</Button>
    </Form>
  );
}

// AuthorForm.propTypes = {
//   obj: PropTypes.shape({
//     id: PropTypes.number,
//     first_name: PropTypes.string,
//     last_name: PropTypes.string,
//     email: PropTypes.string,
//     favorite: PropTypes.number,
//   }),
// };

// AuthorForm.defaultProps = {
//   obj: initialState,
// };

export default AuthorForm;
