import React, { useContext } from "react";
import SingleBookForm from "../SingleBook/SingleBookForm";
import styles from "./SingleBook.module.css";
import BookContext from "../../../Context/BookContext";

function SingleBook(props) {
  const bookCtx = useContext(BookContext);

  const addBookToCartHandler = (amount) => {
    bookCtx.addBook({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={styles.book}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <div>
          <SingleBookForm onAddBook={addBookToCartHandler} />
        </div>
      </div>
    </li>
  );
}

export default SingleBook;