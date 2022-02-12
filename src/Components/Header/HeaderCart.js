import React, { useContext, useEffect, useState } from "react";
import BookContext from "../../Context/BookContext";
import CartSvg from "../UI/SVG/CartSvg";
import styles from "./HeaderCart.module.css";

function HeaderCart(props) {
  const [bump, setBump] = useState(false);
  const bookCtx = useContext(BookContext);
  const { books } = bookCtx;
  const bookCount = books.reduce((currNum, book) => {
    return currNum + book.amount;
  }, 0);

  const bumpStyles = `${styles.button} ${bump ? styles.bump : ""}`;
  useEffect(() => {
    if (books.length === 0) {
      return;
    }
    setBump(true);

    const bumpTimeout = setTimeout(() => {
      setBump(false);
    }, 300);

    return () => clearTimeout(bumpTimeout);
  }, [ books ]);

  return (
    <button className={bumpStyles} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartSvg />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{bookCount}</span>
    </button>
  );
}

export default HeaderCart;