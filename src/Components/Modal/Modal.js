import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onDismissBookCart} />;
};

const Overlay = (props) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalPath = document.getElementById("overlays");

function Modal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onDismissBookCart={props.onDismissBookCart} />,
        portalPath
      )}
      {ReactDOM.createPortal(<Overlay> {props.children} </Overlay>, portalPath)}
    </React.Fragment>
  );
}

export default Modal;