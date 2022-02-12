import React, { useReducer } from "react";
import BookContext from "./BookContext";

const initialState = {
  books: [],
  totalAmount: 0,
};

const bookReducer = (state, action) => {
  if (action.type === "ADD_BOOK") {
    const updatedTotalAmount =
      state.totalAmount + action.book.amount * action.book.price;

    const existingBookIndex = state.books.findIndex(
      (book) => book.id === action.book.id
    );
    const existingBook = state.books[existingBookIndex];

    let updatedBooks;

    if (existingBook) {
      const updatedBook = {
        ...existingBook,
        amount: existingBook.amount + action.book.amount,
      };
      updatedBooks = [...state.books];
      updatedBooks[existingBookIndex] = updatedBook;
    } else {
      updatedBooks = state.books.concat(action.book);
    }

    return {
      books: updatedBooks,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_BOOK") {
    const existingBookIndex = state.books.findIndex(
      (book) => book.id === action.id
    );
    const existingBook = state.books[existingBookIndex];
    const updatedTotalAmount = state.totalAmount - existingBook.price;

    let updatedBooks;

    if (existingBook.amount === 1) {
      updatedBooks = state.books.filter((book) => book.id !== action.id);
    } else {
      const updatedBook = { ...existingBook, amount: existingBook.amount - 1 };
      updatedBooks = [...state.books];
      updatedBooks[existingBookIndex] = updatedBook;
    }
    return {
      books: updatedBooks,
      totalAmount: updatedTotalAmount,
    };
  }

  if(action.type === 'CLEAR_CART') {
    return initialState;
  }
  return initialState;
};

const BookProvider = (props) => {
  const [booksState, dispatchAction] = useReducer(bookReducer, initialState);

  const addBookHandler = (book) => {
    dispatchAction({ type: "ADD_BOOK", book: book });
  };

  const removeBookHandler = (id) => {
    dispatchAction({ type: "REMOVE_BOOK", id: id });
  };

  const clearBookCartHandler = () => {
    dispatchAction({ type : 'CLEAR_CART' })
  }

  const bookContext = {
    books: booksState.books,
    totalAmount: booksState.totalAmount,
    addBook: addBookHandler,
    removeBook: removeBookHandler,
    clearBookCart : clearBookCartHandler
  };
  return (
    <BookContext.Provider value={bookContext}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookProvider;