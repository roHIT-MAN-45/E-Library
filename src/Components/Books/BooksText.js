import React from "react";
import styles from "./BooksText.module.css";

function BooksText() {
  return (
    <section className={styles["text-container"]}>
      <h2>Books With, Amazing Price</h2>
      <p>
        Books have the power to transport us to new worlds and different times,
        but they can also take us back to the important moments in our own
        lives.
      </p>
      <p>
        You’re never alone when you’re reading a book, We Lose Ourselves in
        Books, We Find Ourselves There, Too.
      </p>
    </section>
  );
}

export default BooksText;