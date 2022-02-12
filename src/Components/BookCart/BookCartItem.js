import React from "react";
import styles from "./BookCartItem.module.css";

function BookCartItem(props) {
  const price = `$${ props.price.toFixed(2) }`;
  return (
    <li className={styles["cart-book"]}>
      <div>
        <h2>{ props.name }</h2>
        <div className={ styles.summary }>
          <span className={ styles.price }> { price } </span>
          <span className={ styles.amount }>x { props.amount } </span>
        </div>
      </div>
      <div className={ styles.actions }>
        <button onClick={ props.onBookRemove }>-</button>
        <button onClick={ props.onBookAdd }>+</button>
      </div>
    </li>
  );
}

export default BookCartItem;
