import React from "react";
import styles from "./Sidebar.module.css";

function Folders() {
  return (
    <div>
      <h2>folders</h2>
      <ul className={styles.list}>
        <li>
          <span>boardme development</span>
        </li>
        <li>
          <span>Feature lists</span>
        </li>
        <li>
          <span>Marketing</span>
        </li>
        <li>
          <span>UIDD development</span>
        </li>
        <li>
          <span>Topics</span>
        </li>
        <li>
          <span>Bugs and fixes</span>
        </li>
      </ul>
      <span className={styles.view_btn}>View all</span>
    </div>
  );
}

export default Folders;
