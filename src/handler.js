const { nanoid } = require('nanoid');
const books = require('./books');

const addBooksHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, pageRead, reading } = request.payload;

  if (name === undefined) {
    const response = h.response({
      status: 'Fail',
      message: 'Please enter the name!',
    });
    response.code(400);

    return response;
  }

  if (pageRead > pageCount) {
    const response = h.response({
      status: 'Fail',
      message: 'pageRead should not be higher than pageCount',
    });
    response.code(400);

    return response;
  }

  const id = nanoid(16);
  const finished = pageRead === pageCount;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    pageRead,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'Success',
      message: 'Book successfully added',
      data: {
        bookId: id,
      },
    });
    response.code(201);

    return response;
  }

  const response = h.response({
    status: 'Fail',
    message: 'Failed to add The Book',
  });
  response.code(500);

  return response;
};

const showAllBooksHandler = () => ({
  data: {
    books,
  },
});

module.exports = {
  addBooksHandler,
  showAllBooksHandler,
};
