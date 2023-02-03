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

const showAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let filteredBooks = books;

  if (name !== undefined) {
    filteredBooks = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (reading !== undefined) {
    if (reading === 'true') {
      filteredBooks = books.filter((book) => book.reading === true);
    }
    filteredBooks = books.filter((book) => book.reading === false);
  }
  if (finished !== undefined) {
    if (finished === 'true') {
      filteredBooks = books.filter((book) => book.finished === true);
    }
    filteredBooks = books.filter((book) => book.finished === false);
  }

  const response = h.response({
    status: 'Success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);

  return response;
};

const getBooksByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((b) => b.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'Success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'Fail',
    message: 'Book not found',
  });
  response.code(404);

  return response;
};

const editBooksByIdHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, pageRead, reading } = request.payload;
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  const finished = pageRead === pageCount;
  const updatedAt = new Date().toISOString();

  if (index !== -1) {
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

    books[index] = {
      ...books[index],
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
      updatedAt,
    };

    const response = h.response({
      status: 'Success',
      message: 'Book data has been updated',
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'Fail',
    message: 'Book not found',
  });
  response.code(404);

  return response;
};

const deleteBooksByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'Success',
      message: 'Book has been deleted',
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'Fail',
    messag: 'Failed to delete The Book',
  });
  response.code(404);

  return response;
};

module.exports = {
  addBooksHandler,
  showAllBooksHandler,
  getBooksByIdHandler,
  editBooksByIdHandler,
  deleteBooksByIdHandler,
};
