import React from "react";
import Card from "../UI/Card/Card";
import styles from "./Copyright.module.css";

function Copyright() {
  return (
    <footer className={styles.footer}>
      <Card>
        <p>
          Copyright &copy; E-Library <span>Created By Rohit Sunil Chavan</span>{" "}
          All Rights Reserved.
        </p>
      </Card>
    </footer>
  );
}

export default Copyright;
