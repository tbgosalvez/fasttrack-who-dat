import React from "react";
import Button from "./Button";
import Card from "./Card";
import styles from "./Modal.module.css";

const Modal = (props) => {
  return (
    <>
      <div className={styles.backdrop} onClick={props.onClick}></div>
      <Card className={styles.modal}>
        <header>
          <h2>{props.title}</h2>
        </header>
        <p>{props.message}</p>
        <footer>
          <Button onClick={props.onClick}>ok</Button>
        </footer>
      </Card>
    </>
  );
};

export default Modal;
