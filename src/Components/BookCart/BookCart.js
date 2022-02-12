import React, { useContext, useState } from "react";
import Modal from "../Modal/Modal";
import BookCartItem from "./BookCartItem";
import BookContext from "../../Context/BookContext";
import styles from "./BookCart.module.css";
import CheckOut from "./CheckOut";

function BookCart(props) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const bookCtx = useContext(BookContext);

  const totalAmount = `$${bookCtx.totalAmount.toFixed(2)}`;
  const hasItems = bookCtx.books.length > 0;

  const addBookToCart = (book) => {
    bookCtx.addBook({ ...book, amount: 1 });
  };

  const removeBookFromCart = (id) => {
    bookCtx.removeBook(id);
  };

  const orderButtonHandler = () => {
    setShowCheckout(true);
  };

  const sendOrder = async(userData) => {
    setIsSubmitting(true);
    const response = await fetch('https://e-library-45f3e-default-rtdb.firebaseio.com/orders.json', {
      method : 'POST',
      body : JSON.stringify({
        user : userData,
        orderedBooks : bookCtx.books
      })
    });

    if(!response.ok) {
      throw new Error('Something Went Wrong Please Try Again Later!')
    }
    setIsSubmitting(false);
    setIsSubmittedSuccessfully(true);
    bookCtx.clearBookCart();
  }

  const books = (
    <ul className={styles["cart-books"]}>
      {bookCtx.books.map((book) => (
        <BookCartItem
          key={book.id}
          name={book.name}
          amount={book.amount}
          price={book.price}
          onBookAdd={addBookToCart.bind(null, book)}
          onBookRemove={removeBookFromCart.bind(null, book.id)}
        />
      ))}
    </ul>
  );

  const formActions = (
    <div className={styles.actions}>
      <button
        className={styles["button--alt"]}
        onClick={props.onDismissBookCart}
      >
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderButtonHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <React.Fragment>
      {books}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <CheckOut onDataSubmit={sendOrder} onCancel={props.onDismissBookCart} />
      )}
      {!showCheckout && formActions}
    </React.Fragment>
  );

  const isSubmittingContent = <p className={styles["ordering-paragraph"]}>Your Order Is Being Placed...</p>

  const isSubmittedSuccessfullyContent = <React.Fragment>
    <p className={styles["order-success-paragraph"]}>Order Placed Successfully!</p>
    <div className={styles.actions}>
    <button
        className={styles.button}
        onClick={props.onDismissBookCart}
      >
        Close
      </button>
    </div>
  </React.Fragment>

  return (
    <Modal onDismissBookCart={props.onDismissBookCart}>
      {!isSubmitting && !isSubmittedSuccessfully && modalContent}
      {!isSubmitting && isSubmittedSuccessfully && isSubmittedSuccessfullyContent}
      {isSubmitting && isSubmittingContent}
    </Modal>
  );
}

export default BookCart;
