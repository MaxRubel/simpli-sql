const endpoint = 'http://localhost:8088';

const createAuthorBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/author_books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export default createAuthorBook;
