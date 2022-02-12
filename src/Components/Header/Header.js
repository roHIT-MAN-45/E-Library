import React from "react";
import styles from "./Header.module.css";
import HeaderCart from "./HeaderCart";

function Header(props) {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h2>E-Library</h2>
        <HeaderCart onClick={props.onDisplayBookCart} />
      </header>
      <div className={styles.image}>
        <img src="/Images/library.jpg" alt="library with lots of books" />
      </div>
    </React.Fragment>
  );
}

export default Header;
