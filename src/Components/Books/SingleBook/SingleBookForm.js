import React, { useRef, useState } from "react";
import Input from "../../UI/InputField/Input";
import styles from "./SingleBookForm.module.css";

function SingleBookForm(props) {
  const [isFormValid, setIsFormValid] = useState(true);
  const amountRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber > 10 ||
      enteredAmountNumber < 1
    ) {
      setIsFormValid(false);
      return;
    }
    props.onAddBook(enteredAmountNumber);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "input",
          type: "number",
          min: "1",
          max: "10",
          defaultValue: "1",
          step: "1",
        }}
      />
      <button>+Add</button>
      {!isFormValid && <p>Please Enter valid Amount (1-10).</p>}
    </form>
  );
}

export default SingleBookForm;