const { addBooksHandler, showAllBooksHandler, getBooksByIdHandler, editBooksByIdHandler, deleteBooksByIdHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: showAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBooksByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBooksByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBooksByIdHandler,
  },
];

module.exports = routes;
