import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import styles from "./Term.module.css";

function Term() {
  return (
    <div className={styles.card}>
      <div className={styles.card_header}>
        <span>1</span>
        <div className={styles.card_control}>
          <FaPen style={{ cursor: "pointer", marginRight: "10px" }} />
          <FaTrash style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div className={styles.term}>
        <div>
          <span>to do</span>
          <span className={styles.term_line}></span>
          <span style={{ fontSize: "12px" }}>term</span>
        </div>
        <div>
          <span>делать</span>
          <span className={styles.term_line}></span>
          <span style={{ fontSize: "12px" }}>definition</span>
        </div>
      </div>
    </div>
  );
}

export default Term;
