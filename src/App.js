import React, { useState } from "react";
import Header from "./Components/Header/Header";
import Books from "./Components/Books/Books";
import BookCart from "./Components/BookCart/BookCart";
import BookProvider from "./Context/BookProvider";
import Copyright from "./Components/Copyright Block/Copyright";

function App() {
  const [showBookCart, setShowBookCart] = useState(false);

  const displayBookCart = () => {
    setShowBookCart(true);
  };

  const dismissBookCart = () => {
    setShowBookCart(false);
  };

  return (
    <BookProvider>
      {showBookCart && <BookCart onDismissBookCart={dismissBookCart} />}
      <Header onDisplayBookCart={displayBookCart} />
      <main>
        <Books />
      </main>
      <Copyright/>
    </BookProvider>
  );
}

export default App;