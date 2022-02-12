import React from "react";
import AvailableBooks from "./AvailableBooks";
import BooksText from "./BooksText";

function Books() {
  return (
    <React.Fragment>
      <BooksText />
      <AvailableBooks />
    </React.Fragment>
  );
}

export default Books;