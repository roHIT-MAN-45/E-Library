import React, { useRef, useState } from "react";
import styles from "./CheckOut.module.css";

function CheckOut(props) {
  const [formInputValidity, setFormInputValidity] = useState({
    name : true,
    city : true,
    address : true
  })
  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const addressInputRef = useRef();

  const isEmpty = (value) => {
    return value.trim() === "";
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const cityIsValid = !isEmpty(enteredCity);
    const addressIsValid = !isEmpty(enteredAddress);

    setFormInputValidity({
      name : nameIsValid,
      city : cityIsValid,
      address : addressIsValid
    })

    let formIsValid = false;

    if (nameIsValid && cityIsValid && addressIsValid) {
      formIsValid = true;
    }

    if (!formIsValid) {
      return;
    }

    props.onDataSubmit({
      name : enteredName,
      city : enteredCity,
      address : enteredAddress
    }).catch((error) => {
      console.log(error.message);
    })
  };

  const nameStyles = `${styles.control} ${formInputValidity.name ? '' : styles.invalid}`
  const cityStyles = `${styles.control} ${formInputValidity.city ? '' : styles.invalid}`
  const addressStyles = `${styles.control} ${formInputValidity.address ? '' : styles.invalid}`

  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <div className={nameStyles}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter valid name!</p>}
      </div>
      <div className={cityStyles}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter valid city!</p>}
      </div>
      <div className={addressStyles}>
        <label htmlFor="city">Address</label>
        <input type="text" id="city" ref={addressInputRef} />
        {!formInputValidity.address && <p>Please enter valid address!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
}

export default CheckOut;
