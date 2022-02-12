import React from "react";

const BookContext = React.createContext({
  books: [],
  totalAmount: 0,
  addBook: (book) => {},
  removeBook: (id) => {},
  clearBookCart: () => {},
});

export default BookContext;