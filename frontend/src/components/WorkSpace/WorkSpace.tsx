import React from "react";
import styles from "./WorkSpace.module.css";

function WorkSpace() {
  return (
    <div className={styles.workspace}>
      <h2>Folders</h2>
      <div className={styles.card}>
        <h3>M</h3>
        <span>Marketing</span>
      </div>
    </div>
  );
}

export default WorkSpace;
