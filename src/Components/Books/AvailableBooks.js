import React, { useState, useEffect } from "react";
import Card from "../UI/Card/Card";
import SingleBook from "../Books/SingleBook/SingleBook";
import styles from "./AvailableBooks.module.css";

function AvailableBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://e-library-45f3e-default-rtdb.firebaseio.com/books.json"
      );

      if(!response.ok) {
        throw new Error('Something Went Wrong Please Try Again!')
      }

      const responseData = await response.json();

      const loadedBooks = [];

      for (const key in responseData) {
        loadedBooks.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setBooks(loadedBooks);
      setIsLoading(false);
    };


    fetchData().catch((error) => {
      setIsLoading(false);
      setHasError(error.message);
    });
  }, []);

  if(isLoading) {
    return <section className={styles.loading}>
      <p>Loading...</p>
    </section>
  }

  if(hasError) {
    return <section className={styles.fetcherror}>
      <p>{hasError}</p>
    </section>
  }

  const allBooks = books.map((book) => (
    <SingleBook
      key={book.id}
      id={book.id}
      description={book.description}
      name={book.name}
      price={book.price}
    />
  ));
  return (
    <section className={styles.books}>
      <Card>
        <ul>{allBooks}</ul>
      </Card>
    </section>
  );
}

export default AvailableBooks;